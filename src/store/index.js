import { configureStore } from "@reduxjs/toolkit";

import newQuizSlice from "./new-quiz-slice";
import uiSlice from "./ui-slice";
import serverResponse from "./responses-from-server-slice";
import tokenSlice from "./token-slice";

const store = configureStore({
    reducer: {
        new_quiz: newQuizSlice.reducer,
        ui : uiSlice.reducer,
        profile_data: serverResponse.reducer,
        token: tokenSlice.reducer
    }
})


export default store