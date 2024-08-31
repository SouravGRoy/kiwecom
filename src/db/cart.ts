export interface CartItem {
  id: string;
  name: string;
  discount: number;
  priceInCents: number;
  filePath: string;
  imagePath: string;
  description: string;
  isAvailableForPurchase: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  quantity: number;
  category: string;
}
