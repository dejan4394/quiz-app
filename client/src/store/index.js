import { configureStore } from "@reduxjs/toolkit";

import newAnswersSlice from "./new-answers-slice";
import uiSlice from "./ui-slice";
import serverResponse from "./responses-from-server-slice";
import tokenSlice from "./token-slice";
import generatedQuizzSlice from "./set-generated-quizz";

const store = configureStore({
    reducer: {
        new_answers: newAnswersSlice.reducer,
        ui : uiSlice.reducer,
        profile_data: serverResponse.reducer,
        token: tokenSlice.reducer,
        generated_quizz: generatedQuizzSlice.reducer
    }
})


export default store