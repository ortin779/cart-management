import {createSlice} from '@reduxjs/toolkit';
import { uiSliceActions } from './ui-slice';

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

export const sendCartData = (cart)=>{
    return async (dispatch)=>{
        dispatch(uiSliceActions.showNotification({
            status:"pending",
            title:"Seding...",
            message:"sending cart data"
        }))

        const sendRequest = async ()=>{
            const response = await fetch(
                "https://react-cart-e1cbb-default-rtdb.firebaseio.com/cart.json",
                {
                method:"PUT",
                body:JSON.stringify(cart)
                }
            )

            if(!response.ok){
                throw new Error("Sending card data failed");
            }
        }

        try{
            await sendRequest();

            dispatch(uiSliceActions.showNotification({
                status:"success",
                title:"Success...",
                message:"Cart data sent successfully"
            }))
        }catch(error){
            dispatch(uiSliceActions.showNotification({
                status:"error",
                title:"Error...",
                message:"Card data sending failed"
            }))
        }
    }
}

export const getCartData = ()=>{
    return async (dispatch)=>{
        dispatch(uiSliceActions.showNotification({
            status:"pending",
            title:"Fetching...",
            message:"Fetching cart data"
        }))

        const sendRequest = async ()=>{
            const response = await fetch(
                "https://react-cart-e1cbb-default-rtdb.firebaseio.com/cart.json",
            )

            if(!response.ok){
                throw new Error("Sending card data failed");
            }

            return response.json((data)=>{return data})
        }

        try{
            const response = await sendRequest();

            dispatch(uiSliceActions.showNotification({
                status:"success",
                title:"Success...",
                message:"Cart Details fetched successfully"
            }))

            dispatch(cartActions.setCartDetails(response))
        }catch(error){
            dispatch(uiSliceActions.showNotification({
                status:"error",
                title:"Error...",
                message:"Error while getting cart details"
            }))
        }
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;