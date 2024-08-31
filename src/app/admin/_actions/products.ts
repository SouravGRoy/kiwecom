"use server"
import { z } from "zod";
import fs from "fs/promises";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(file => file.size > 0 && file.type.startsWith("image/"), { message: "Invalid image file" });

const addSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1,{message:"Category is required"}),
  description: z.string().min(1, { message: "Description is required" }),
  discount: z.coerce.number().int().min(1, { message: "Discount must be at least 1 cent" }),
  
  priceInCents: z.coerce.number().int().min(1, { message: "Price must be at least 1 cent" }),
  file: fileSchema.refine(file => file.size > 0, { message: "File is required" }),
  image: imageSchema.refine(file => file.size > 0, { message: "Image is required" })
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
     category:data.category,
      description: data.description,
      discount: data.discount,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional()
});

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let { filePath, imagePath } = product;

  if (data.file && data.file.size > 0) {
    await fs.unlink(filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  if (data.image && data.image.size > 0) {
    await fs.unlink(`public${imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      category:data.category,
      discount: data.discount,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase }
  });
  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
}
