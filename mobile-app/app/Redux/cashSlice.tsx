import {PayloadAction, createSlice, isAction} from "@reduxjs/toolkit"

export type cashState = {
    cash : number
}
export type itemState = {
    item : string[]
}

export const initialState: cashState = {
    cash : 500
}
const itemInitialState : itemState = {
    item : []
}


export const cashSlice = createSlice({
    initialState,
    name : 'cash',
    reducers : {
        plus:(state, action:PayloadAction<number>)=>{
            
            state.cash = state.cash + action.payload
        },
        minus:(state, action:PayloadAction<number>)=>{
            state.cash = state.cash - action.payload
        }
    }
})
export const {plus, minus} = cashSlice.actions;

const cashReducer = cashSlice.reducer;

export default cashReducer;

