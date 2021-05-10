import {LOGIN, SET_STEP} from "../../action-types";

const initialState = {
    step: LOGIN
}

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STEP:
            return {step: action.step}
        default:
            return state
    }
}