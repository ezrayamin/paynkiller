let INITIAL_STATE = {
    dataUom: [],
    selectPickerUom: [],
    errLogin: ""
}

const uomReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_UOM':
            return{
                ...state,
                dataUom: action.payload
            }
        case 'SELECT_PICKER_UOM':
            return{
                ...state,
                selectPickerUom: action.payload
            }
        case 'UOM_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'REMOVE_ERR':
            return {
                ...state,
                errLogin: ""
            }
        default:
            return state
    }
}

export default uomReducer