import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  category: string;
  quantity: number;
}

interface CartState {
  cart: Product[];
  userId: string | null;
}

// Function to get the initial state from localStorage
const getInitialCartState = (): CartState => {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const savedCart = localStorage.getItem(`cart-${userId}`);
      return {
        cart: savedCart ? JSON.parse(savedCart) : [],
        userId: userId,
      };
    }
  }

  return {
    cart: [],
    userId: null,
  };
};

const initialState: CartState = getInitialCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    
      if (state.userId && typeof window !== 'undefined') {
        // Retrieve the cart for the current user
        const savedCart = localStorage.getItem(`cart-${state.userId}`);
        state.cart = savedCart ? JSON.parse(savedCart) : [];
      } else {
        // Keep the cart in localStorage; only clear the Redux state
        state.cart = [];
      }
    }
    
    
    ,
    
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
      
      if (state.userId && typeof window !== 'undefined') {
        localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
      }
    },
    
    updateCart(state, action: PayloadAction<Product[]>) {
      state.cart = action.payload;
      
      if (state.userId && typeof window !== 'undefined') {
        localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
      }
    },
    
    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      
      state.cart = state.cart.filter(item => item.id !== itemId);
      
      if (state.userId && typeof window !== 'undefined') {
        localStorage.setItem(`cart-${state.userId}`, JSON.stringify(state.cart));
      }
    },
    
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;

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

export const { setUserId, addToCart, updateCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
