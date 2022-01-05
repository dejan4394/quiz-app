import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showProgress: false,
        showModal: false,
    },
    reducers: {
        setShowProgress(state, action) {
            state.showProgress = action.payload.progress
        },
        setModal (state, action) {
            state.showModal = action.payload.show
        },
    }
})

export const uiActions = uiSlice.actions

export default uiSlice