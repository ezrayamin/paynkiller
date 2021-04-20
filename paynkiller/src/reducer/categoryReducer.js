const INITIAL_STATE = {
  cate: [],
  specific: [],
  selectPickerCategory: [],
  errLogin: [],
};

export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_CATEGORY":
      return {
        cate: action.payload,
      };
    case "SELECT_PICKER_CATEGORY":
      return {
        ...state,
        selectPickerCategory: action.payload,
      };
    case "CATEGORY_ERR":
      return {
        ...state,
        errLogin: action.payload,
      };
    case "REMOVE_ERR":
      return {
        ...state,
        errLogin: "",
      };
    default:
      return state;
  }
};
