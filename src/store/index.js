import { configureStore } from "@reduxjs/toolkit";

import newQuizSlice from "./new-quiz-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        new_quiz: newQuizSlice.reducer,
        ui : uiSlice.reducer
    }
})


export default store