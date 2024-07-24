import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    numItems: 0
},
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if(existingItem){
        existingItem.quantity++;
      }else{
        state.items.push({name, image, cost, quantity: 1});
      }
      state.numItems++;
    },
    removeItem: (state, action) => {
        const {name} = action.payload;
        const item = state.items.find(item => item.name === name);
        state.numItems -= item.quantity; //eliminamos la cantidad de ese producto del total de productos
        state.items = state.items.filter(item => item.name != name); //seteamos los items del carrito a todos los que no tengan ese nombre
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const item = state.items.find(item => item.name === name);
        if(item) {
            state.numItems += (quantity - item.quantity); //añadimos al total de elementos la cantidad que nos queda de lo que ya había de ese producto menos lo que hay ahora 
            item.quantity = quantity; //actualizamos la cantidad de producto 
        }
    
    },
  },
});

export const selectTotalItems = state => state.cart.numItems;

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
