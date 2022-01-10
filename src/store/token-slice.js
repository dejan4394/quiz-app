import { createSlice } from "@reduxjs/toolkit";


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token_string: ''
    },
    reducers: {
        saveToken (state, action) {
            state.token_string = action.payload.token_string
        }
    }
})

export const tokenActions = tokenSlice.actions

export default tokenSlice



