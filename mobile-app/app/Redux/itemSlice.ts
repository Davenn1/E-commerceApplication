import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type itemState = {
    item : {name:string, price:number, description:string, image:string}[]
}

const initialState : itemState = {
    item : []
}

export const itemSlice = createSlice({
    initialState,
    name: "item",
    reducers : {
        add : (state, action:PayloadAction<{name:string; price:number; description:string; image:string}>)=>{
            state.item.push(action.payload)
        },
        remove: (state, action:PayloadAction<{name:string; price:number; description:string; image:string}>)=>{
            

            const idx = state.item.findIndex(x=>x.name == action.payload.name);
                if (idx === -1) {
                    state.item = [...state.item]
                }
            state.item = state.item.filter((el, i) => i !== idx)
            
        }
    }
})

export const {add, remove} = itemSlice.actions;

const itemReducer = itemSlice.reducer;

export default itemReducer;