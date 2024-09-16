import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInformation from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    discount: number;
    createdAt: Date;
    downloadVerificationId: string;
    category: string; // Add category here
    product: {
      name: string;
      imagePath: string;
      description: string;
      category: string; // Add category here
    };
  }[];
};

const previewProps: OrderHistoryEmailProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      discount: 11000,
      downloadVerificationId: crypto.randomUUID(),
      category: "electronics", // Example category
      product: {
        name: "Product name",
        imagePath: "/products/test.jpg",
        description: "Some description",
        category: "electronics", // Example category
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      discount: 11000,
      downloadVerificationId: crypto.randomUUID(),
      category: "books", // Example category
      product: {
        name: "Product name",
        imagePath: "/products/test.jpg",
        description: "Some description",
        category: "books", // Example category
      },
    },
  ],
};

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Download</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OrderHistoryEmail.defaultProps = previewProps;
