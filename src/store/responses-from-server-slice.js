import { createSlice } from "@reduxjs/toolkit";

const serverResponse = createSlice({
    name: 'profile_data',
    initialState: {
        completedQuizes: null,
        serverMsg: ''
    },
    reducers: {
        setCompletedQuizes (state, action) {
            const quiz = action.payload
            state.completedQuizes= quiz.completed_quizes
        },
        messageFromServer (state, action) {
            state.serverMsg = action.payload.message
        }
    }
})


export const serverResponseActions = serverResponse.actions

export default serverResponse