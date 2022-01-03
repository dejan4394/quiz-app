import { configureStore } from "@reduxjs/toolkit";

import newQuizSlice from "./new-quiz-slice";

const store = configureStore({
    reducer: {
        new_quiz: newQuizSlice.reducer
    }
})


export default store