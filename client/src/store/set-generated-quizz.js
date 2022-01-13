import { createSlice } from "@reduxjs/toolkit";


const generatedQuizzSlice = createSlice({
    name: 'generated_quizz',
    initialState:{ 
        generatedQuizz: []
    },
    reducers:{
        setGeneratedQuizz (state, action) {
            state.generatedQuizz = action.payload.generatedQuizz
        }
    }
})


export const generatedQuizzActions = generatedQuizzSlice.actions

export default generatedQuizzSlice