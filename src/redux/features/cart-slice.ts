// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: string;
//   name: string;
//   priceInCents: number;
//   quantity: number;
//   imagePath: string;
//   category: string;
// }

// interface CartState {
//   cart: CartItem[];
// }

// const initialState: CartState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.cart.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.cart.push(action.payload);
//       }
//     },
//     updateCart: (state, action: PayloadAction<CartItem[]>) => {
//       state.cart = action.payload;
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//     },
//     updateQuantity: (
//       state,
//       action: PayloadAction<{ id: string; quantity: number }>
//     ) => {
//       const existingItem = state.cart.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         existingItem.quantity = action.payload.quantity;
//       }
//     },
//   },
// });

// export const { addToCart, updateCart, removeFromCart, updateQuantity } =
//   cartSlice.actions;
// export default cartSlice.reducer;

"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  category:string;
  quantity: number;
}

interface CartState {
  cart: Product[];
  userId: string | null;
}

const initialState: CartState = {
  cart: [],
  userId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;

      if (state.userId && typeof window !== 'undefined') {
        const savedCart = localStorage.getItem(`cart-${state.userId}`);
        if (savedCart) {
          state.cart = JSON.parse(savedCart);
        }
      }
    },
    addToCart(state, action: PayloadAction<Product>) {
      state.cart.push(action.payload);
      if (state.userId && typeof window !== 'undefined') {
        localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
      }
    },
    updateCart(state, action: PayloadAction<Product[]>) {
      state.cart = action.payload;
      if (state.userId && typeof window !== 'undefined') {
        localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
        console.log("Saved Cart to localStorage: ", localStorage.getItem(`cart-${state.userId}`));

      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      if (state.userId && typeof window !== 'undefined') {
        localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (state.userId && typeof window !== 'undefined') {
          localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      if (state.userId && typeof window !== 'undefined') {
        localStorage.removeItem(`cart-${state.userId}`);
      }
    },
  },
});

export const { setUserId, addToCart, updateCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
  export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
