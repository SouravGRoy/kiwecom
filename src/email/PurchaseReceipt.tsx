import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInformation from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
    category: string; // Added category here
  };
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
    discount: number;
    category: string; // Added category here
  };
  downloadVerificationId: string;
};

const previewProps: PurchaseReceiptEmailProps = {
  product: {
    name: "Product name",
    imagePath: "/products/test.jpg",
    description: "Some description",
    category: "electronics", // Example category
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
    discount: 11000,
    category: "electronics", // Example category
  },
  downloadVerificationId: crypto.randomUUID(),
};

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

PurchaseReceiptEmail.defaultProps = previewProps;
