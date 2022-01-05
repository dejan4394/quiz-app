import { configureStore } from "@reduxjs/toolkit";

import newQuizSlice from "./new-quiz-slice";
import uiSlice from "./ui-slice";
import serverResponse from "./responses-from-server-slice";

const store = configureStore({
    reducer: {
        new_quiz: newQuizSlice.reducer,
        ui : uiSlice.reducer,
        profile_data: serverResponse.reducer
    }
})


export default store