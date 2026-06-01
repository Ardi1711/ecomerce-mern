

import { createSlice } from '@reduxjs/toolkit';

//  Merr shporten nga localStorage
const initialState = {
  items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  totalPrice: 0,
  totalQuantity: 0
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
      const { productId, name, price, quantity } = action.payload;
      
   
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        //  Nese ekziston, shtoja sasine
        existingItem.quantity += quantity || 1;
      } else {
        //  Nese nuk ekziston, shto te ri
        state.items.push({
          productId,
          name,
          price,
          quantity: quantity || 1
        });
      }

      //  Perditeso totalin
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      //  Ruaj ne localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

   
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

   
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        item.quantity = quantity;
      }

    
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
