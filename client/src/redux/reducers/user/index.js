const initialState = {
    name: null,
    userId: null,
    loading: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...initialState,
                loading: true
            }
        case "LOGOUT_START":
            return {
                ...state,
                loading: true
            }
        case "LOGOUT_SUCCESS":
            return {
                ...initialState,
                loading: false
            }
        case "LOGOUT_ERROR":
            return {
                ...state,
                loading: false
            }
        case "LOGIN_SUCCESS":
            return {
                ...action.payload,
                loading: false
            }
        case "LOGIN_ERROR":
            return {
                ...initialState,
            }
        default:
            return state
    }
}