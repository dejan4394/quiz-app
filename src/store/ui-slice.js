import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notification: null,
        showModal: false,
        response: ''
    },
    reducers: {
        showNotification (state, action) {
            state.notification = { 
                status: action.payload.status,
                title : action.payload.title,
                message : action.payload.message
            }
        },
        setModal (state, action) {
            state.showModal = action.payload.show
        },
        responseFromServer (state, action) {
            state.response = action.payload.message
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice