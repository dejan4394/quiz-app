import { createSlice } from "@reduxjs/toolkit";

const serverResponse = createSlice({
    name: 'profile_data',
    initialState: {
        completedQuizes: null,
        serverMsg: '',
        changed: false
    },
    reducers: {
        setCompletedQuizes (state, action) {
            const quiz = action.payload
            state.completedQuizes= quiz.completed_quizes
        },
        messageFromServer (state, action) {
            state.serverMsg = action.payload.message
        },
        setChanged(state) {
            state.changed = !state.changed
        }
    }
})


export const serverResponseActions = serverResponse.actions

export default serverResponse