import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showProgress: false,
        modal :{
            showModal: false,
            firstButton: {
            displayFirstButton : 'none',
            textFirstButton : ''
            },
            secondButton: {
            displaySecondButton : 'none',
            textSecondButton : ''
            }
    }
    },
    reducers: {
        setShowProgress(state, action) {
            state.showProgress = action.payload.progress
        },
        setModal (state, action) {
            state.modal = {
                showModal : action.payload.show,
                firstButton : {
                    displayFirstButton : action.payload.displayFirstButton,
                    textFirstButton : action.payload.textFirstButton
                },
                secondButton : {
                    displaySecondButton : action.payload.displaySecondButton,
                    textSecondButton : action.payload.textSecondButton
                }
            }
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice