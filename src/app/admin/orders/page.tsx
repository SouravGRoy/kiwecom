import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "../_components/PageHeader";
import db from "@/db/db";
import { MoreVertical } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import DeleteDropDownItem from "./_components/OrderActions";

// Define the type for the order object based on your Prisma schema
type Order = {
  id: string;
  pricePaidInCents: number;
  discount: number | null;
  category: string;
  product: {
    name: string;
  };
  user: {
    email: string;
  };
};

function getOrders(): Promise<Order[]> {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      discount: true,
      category: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default function OrdersPage() {
  return (
    <>
      <PageHeader>Sales</PageHeader>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const orders = await getOrders();
  if (orders.length === 0) return <p>No Sales found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.category}</TableCell>
            <TableCell>{formatCurrency(order.pricePaidInCents)}</TableCell>
            <TableCell>{order.discount}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
