"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatCurrency } from "@/lib/formatter";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

const CATEGORIES = [
  "SNEAKERS",
  "TSHIRTS",
  "HOODIES",
  "ACCESSORIES",
  "WATCHES",
  "JEWELLERY",
  "CARE",
  "GIFT CARD",
  "JACKETS",
  "SHIRTS",
];

export default function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );
  const [category, setCategory] = useState<string>(product?.category || "");

  return (
    <div>
      <form action={action} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={product?.name || ""}
          ></Input>
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price In Rupees</Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            value={priceInCents}
            onChange={(e) =>
              setPriceInCents(Number(e.target.value) || undefined)
            }
            required
          ></Input>
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
          {error.priceInCents && (
            <div className="text-destructive">{error.priceInCents}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount In Rupees</Label>
          <Input
            type="number"
            id="discount"
            name="discount"
            value={product?.discount}
            required
          ></Input>
          <div className="text-muted-foreground">
            {100 + (product?.discount || 0)}
          </div>
          {error.discount && (
            <div className="text-destructive">{error.discount}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {error.category && (
            <div className="text-destructive">{error.category}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description || ""}
          />
          {error.description && (
            <div className="text-destructive">{error.description}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required={product == null} />
          {product != null && (
            <div className="text-muted-foreground">{product.filePath}</div>
          )}
          {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={product == null}
          />
          {product != null && (
            <Image
              src={product.imagePath}
              height="400"
              width="400"
              alt="product"
            />
          )}
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
