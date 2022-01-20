import { createSlice } from "@reduxjs/toolkit";


const generatedQuizzSlice = createSlice({
    name: 'generated_quizz',
    initialState:{ 
        generatedQuizz: [],
        generatedQuizzAnswers: []
    },
    reducers:{
        setGeneratedQuizz (state, action) {
            state.generatedQuizz = action.payload.generatedQuizz
        },
        setGeneratedQuizzAnswers (state, action) {
            state.generatedQuizzAnswers = action.payload.answers
        }
    }
})


export const generatedQuizzActions = generatedQuizzSlice.actions

export default generatedQuizzSlice