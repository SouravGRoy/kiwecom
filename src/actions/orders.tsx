"use server";

import db from "@/db/db";
import OrderHistoryEmail from "@/email/OrderHistory";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = emailSchema.safeParse(formData.get("email"));

  if (result.success === false) {
    return { error: "Invalid email address" };
  }

  const user = await db.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
          discount: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              category: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (user == null) {
    return {
      message:
        "Check your email to view your order history and download your products",
    };
  }

  try {
    const orders = await Promise.all(
      user.orders.map(async (order) => {
        const downloadVerification = await db.downloadVerification.create({
          data: {
            expiredAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
            productId: order.product.id,
          },
        });

        return {
          id: order.id,
          pricePaidInCents: order.pricePaidInCents,
          discount: order.discount,
          createdAt: order.createdAt,
          downloadVerificationId: downloadVerification.id,
          category: order.product.category, // Ensure category is included
          product: {
            name: order.product.name,
            imagePath: order.product.imagePath,
            description: order.product.description,
            category: order.product.category, // Ensure category is included
          },
        };
      })
    );

    const data = await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Order History",
      react: <OrderHistoryEmail orders={orders} />,
    });

    if (data.error) {
      return {
        error: "There was an error sending your email, please try again",
      };
    }

    return {
      message:
        "Check your email to view your order history and download your products",
    };
  } catch (error) {
    console.error("Error in emailOrderHistory:", error);
    return {
      error: "There was an error processing your request, please try again",
    };
  }
}
