import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isCartVisible:false,
    notification:null
}

export const uiSlice = createSlice({
    name:"uiSlice",
    initialState,
    reducers:{
      toggleCartVisibility:(state)=>{
        state.isCartVisible = !state.isCartVisible
      },
      showNotification:(state,action)=>{
        state.notification = action.payload
      }
    }
  });

export const uiSliceActions = uiSlice.actions