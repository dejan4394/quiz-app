import { createSlice } from "@reduxjs/toolkit";


const newQuizSlice = createSlice({
    name: 'new_quiz',
    initialState: {
        newQuiz : {
            quizz_name: '',
            difficulty: '',
            score: ''
        }
    },
    reducers: {
        saveNewQuiz( state, action ) {
            state.newQuiz = {
                quizz_name : action.payload.quizz_name,
                difficulty : action.payload.difficulty,
                score : action.payload.score
        }
        }
    }
})

export const newQuizActions = newQuizSlice.actions

export default newQuizSlice