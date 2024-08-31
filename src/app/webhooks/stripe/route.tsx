import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get("stripe-signature") as string;
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      const productId = charge.metadata.productId;
      const email = charge.billing_details.email;
      const pricePaidInCents = charge.amount;

      if (!productId || !email) {
        return new NextResponse("Bad Request", { status: 400 });
      }

      // Ensure product exists
      const product = await db.product.findUnique({ where: { id: productId } });
      if (!product) {
        return new NextResponse("Product Not Found", { status: 404 });
      }

      const userFields = {
        email,
        orders: {
          create: {
            productId,
            pricePaidInCents,
            discount: product.discount, // Use the product's discount
            category: product.category, // Use the product's category
          },
        },
      };

      const {
        orders: [order],
      } = await db.user.upsert({
        where: { email },
        create: userFields,
        update: userFields,
        select: {
          orders: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              createdAt: true,
              productId: true,
              pricePaidInCents: true,
              discount: true,
              category: true,
            },
          },
        },
      });

      const downloadVerification = await db.downloadVerification.create({
        data: {
          productId,
          expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Order Confirmation",
        react: (
          <PurchaseReceiptEmail
            order={order}
            product={product}
            downloadVerificationId={downloadVerification.id}
          />
        ),
      });

      return new NextResponse("Success", { status: 200 });
    } else {
      console.log(`Unhandled event type ${event.type}`);
      return new NextResponse("Event type not handled", { status: 400 });
    }
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
