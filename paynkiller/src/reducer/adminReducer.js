let INITIAL_STATE = {
    dataAdmin: [],
    usernameAdmin : "",
    errLogin: ""
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_ADMIN':
            return{
                ...state,
                dataAdmin: action.payload
            }
        case 'LOGIN_ADMIN':
            return{
                ...state,
                usernameAdmin: action.payload.username
            }
        case 'LOGIN_ADMIN_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'REMOVE_ERR':
            return {
                ...state,
                errLogin: ""
            }
        case 'LOGOUT_ADMIN':
            return INITIAL_STATE
        default:
            return state
    }
}

export default adminReducer