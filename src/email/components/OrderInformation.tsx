import { formatCurrency } from "@/lib/formatter";
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";

type OrderInformationProps = {
  order: {
    id: string;
    createdAt: Date;
    category: string;
    pricePaidInCents: number;
    discount: number;
  };
  product: {
    imagePath: string;
    name: string;
    description: string;
    category: string;
  };
  downloadVerificationId: string;
};

const dateFormater = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function OrderInformation({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Order Id
            </Text>
            <Text className="mt-0 mr-4">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Purchased On
            </Text>
            <Text className="mt-0 mr-4">
              {dateFormater.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Price Paid
            </Text>
            <Text className="mt-0 mr-4">
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
            <Text>{order.discount}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Category
            </Text>
            <Text className="mt-0 mr-4">{order.category}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 p-4 rounded-lg md:p-6 my-4">
        <Img
          width="100px"
          alt={product.name}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
        />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
          </Column>
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">
              {product.category}
            </Text>
          </Column>
          <Column align="right">
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
              className="bg-black text-white px-6 py-4 rounded text-lg"
            >
              Download
            </Button>
          </Column>
          <Column>
            <Row>
              <Text className="text-gray-500 mb-0">{product.description}</Text>
            </Row>
          </Column>
        </Row>
      </Section>
    </>
  );
}
