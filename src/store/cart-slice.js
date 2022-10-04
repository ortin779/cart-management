import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items:[],
    totalItems:0,
    totalAmount:0
}


const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            const itemIndex = state.items.findIndex((item)=>item.id === action.payload.id);
            state.totalAmount+=action.payload.price
            if(itemIndex!==-1){
                const item = state.items[itemIndex];
                state.items[itemIndex] = {...item,quantity:item.quantity+1,total:item.total+item.price}
            }else{
                state.items.push({...action.payload,total:action.payload.price,quantity:1})
                state.totalItems+=1
            }
        },
        removeItem:(state,action)=>{
            const itemIndex = state.items.findIndex((item)=>item.id === action.payload.id);
            if(itemIndex!==-1){
                const item = state.items[itemIndex];
                state.totalAmount-=item.price
                console.log(itemIndex);
                if(item.quantity>1){
                    state.items[itemIndex] = {...item,quantity:item.quantity-1,total:item.total-item.price}
                }else{
                    state.items.splice(itemIndex,1)
                }
            }
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;