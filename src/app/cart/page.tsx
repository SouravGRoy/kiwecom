"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateCart, removeFromCart } from "@/redux/features/cart-slice";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  quantity: number;
  category?: string; // Optional if category is not always present
}

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  console.log("Cart Items in CartPage:", cartItems);

  const incrementCartItem = (id: string) => {
    dispatch(
      updateCart(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    );
  };

  const decrementCartItem = (id: string) => {
    dispatch(
      updateCart(
        cartItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      )
    );
  };

  const removeCartItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="my-20">
      <h1 className="text-center text-5xl uppercase font-founders">Cart</h1>
      <div className="mt-16 px-16 flex gap-7">
        <table className="w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="flex items-center space-x-4">
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                    {item.category && (
                      <p className="text-sm">{item.category}</p>
                    )}
                    <p className="text-sm">${item.priceInCents / 100}</p>
                  </div>
                </td>
                <td>
                  <Button
                    onClick={() => decrementCartItem(item.id)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  {item.quantity}
                  <Button onClick={() => incrementCartItem(item.id)}>+</Button>
                  <Button onClick={() => removeCartItem(item.id)}>
                    Remove
                  </Button>
                </td>
                <td className="text-right">
                  ${(item.priceInCents * item.quantity) / 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartPage;
