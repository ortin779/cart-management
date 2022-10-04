import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isCartVisible:false
}

export const uiSlice = createSlice({
    name:"uiSlice",
    initialState,
    reducers:{
      toggleCartVisibility:(state)=>{
        state.isCartVisible = !state.isCartVisible
      }
    }
  });

export const uiSliceActions = uiSlice.actions