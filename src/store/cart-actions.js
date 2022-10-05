import { cartActions } from "./cart-slice"
import { uiSliceActions } from "./ui-slice"

export const sendCartData = (cart)=>{
    return async (dispatch)=>{
        dispatch(uiSliceActions.showNotification({
            status:"pending",
            title:"Seding...",
            message:"sending cart data"
        }))

        const sendRequest = async ()=>{
            const response = await fetch(
                process.env.REACT_APP_API_URL,
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
                process.env.REACT_APP_API_URL,
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