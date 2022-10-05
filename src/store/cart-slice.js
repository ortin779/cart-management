import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items:[],
    quantity:0
}


const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            const itemIndex = state.items.findIndex((item)=>item.id === action.payload.id);
            state.quantity+=1
            if(itemIndex!==-1){
                const item = state.items[itemIndex];
                state.items[itemIndex] = {...item,quantity:item.quantity+1,total:item.total+item.price}
            }else{
                state.items.push({...action.payload,total:action.payload.price,quantity:1})
            }
        },
        removeItem:(state,action)=>{
            const itemIndex = state.items.findIndex((item)=>item.id === action.payload.id);
            state.quantity-=1
            if(itemIndex!==-1){
                const item = state.items[itemIndex];
                if(item.quantity>1){
                    state.items[itemIndex] = {...item,quantity:item.quantity-1,total:item.total-item.price}
                }else{
                    state.items.splice(itemIndex,1)
                }
            }
        },
        setCartDetails:(state,action)=>{
            state.quantity = action.payload.quantity;
            state.items = action.payload.items;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;