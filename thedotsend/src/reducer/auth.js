import { SET_USER, IS_AUTHTHENTICATED, IS_VERIFYED } from "../action/action.types";


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: false,
    isVerifyed: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case 'IS_AUTHTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload,
                loading: false
            }
        default:
            return state
    }
}