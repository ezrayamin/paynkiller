let INITIAL_STATE = {
    resUpload: '',
    errUpload: ''
}

const historyUserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RES_UPLOAD':
            return {
                ...state,
                resUpload: action.payload
            }
        case 'ERR_UPLOAD':
            return {
                ...state,
                errUpload: action.payload
            }
        default:
            return state
    }
}

export default historyUserReducer