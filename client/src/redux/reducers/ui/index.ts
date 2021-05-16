import {LOGIN, SET_STEP} from "../../action-types";
import {ActionUi} from "../types";

const initialState = {
    step: LOGIN
}

export default function uiReducer(state = initialState, action: ActionUi) {
    switch (action.type) {
        case SET_STEP:
            return {step: action.step}
        default:
            return state
    }
}