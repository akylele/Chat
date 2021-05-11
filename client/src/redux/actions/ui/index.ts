import {SET_STEP} from "../../action-types";

export const setStep = (step: string) => ({
    type: SET_STEP,
    step
})