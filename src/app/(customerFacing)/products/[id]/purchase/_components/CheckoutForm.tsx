"use client";
import { userOrderExists } from "@/app/actions/order";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FormEvent, useState } from "react";
type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    discount: number;
    category: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutForm({
  product,
  clientSecret,
}: CheckoutFormProps) {
  return (
    <div className="flex w-full px-10 gap-10 space-y-8">
      <div className="flex gap-4 w-full items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl uppercase  font-bold">{product.name}</h1>
          <h1 className="text-2xl font-semibold text-gray-400">
            {product.category}
          </h1>
          <div className="flex space-x-2">
            <h1 className="text-lg">{formatCurrency(product.priceInCents)}</h1>
            <h1 className="text-lg line-through">{product.discount}</h1>
          </div>
          <div className="line-clamp-3 mt-6 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <div className="w-full py-10">
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <Form priceInCents={product.priceInCents} productId={product.id} />
        </Elements>
      </div>
    </div>
  );
}

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (stripe == null || elements == null || email == null) return;
    setIsLoading(true);

    const orderExists = await userOrderExists(email, productId);

    if (orderExists) {
      setErrorMessage(
        "You have already purchased this product.Try downloading from the My Orders page"
      );
      setIsLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occured");
        }
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-4">
        <CardHeader className="mb-6">
          <CardTitle className="text-zinc-800 font-semibold">
            Checkout
          </CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive ">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>

          <CardFooter>
            <Button
              className="w-full mt-6"
              size="lg"
              disabled={stripe == null || elements == null || isLoading}
            >
              {isLoading
                ? "Purchasing..."
                : `Purchase - ${formatCurrency(priceInCents)}`}
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  );
}
