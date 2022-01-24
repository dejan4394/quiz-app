import { createSlice } from "@reduxjs/toolkit";

const setClickedAnswer = createSlice({
    name: 'clicked_answer',
    initialState: {
        clicked: false
    },
    reducers:{
        setClicked (state){
            state.clicked = !state.clicked
        }
    }
})

export const setClickedAnswerActions = setClickedAnswer.actions

export default setClickedAnswer

