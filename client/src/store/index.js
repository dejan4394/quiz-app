import { configureStore } from "@reduxjs/toolkit";

import newAnswersSlice from "./new-answers-slice";
import uiSlice from "./ui-slice";
import serverResponse from "./responses-from-server-slice";
import tokenSlice from "./token-slice";
import generatedQuizzSlice from "./set-generated-quizz";
import setClickedAnswer from "./setClickedAnswer";

const store = configureStore({
    reducer: {
        new_answers: newAnswersSlice.reducer,
        ui : uiSlice.reducer,
        profile_data: serverResponse.reducer,
        token: tokenSlice.reducer,
        generated_quizz: generatedQuizzSlice.reducer,
        clicked_answer: setClickedAnswer.reducer
    }
})


export default store