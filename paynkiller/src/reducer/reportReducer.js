let INITIAL_STATE = {
  dataReportTransaction: [],
  dataReportJualProduct: [],
  dataReportJualBahanBaku: [],
  dataBestProduct: "",
  dataBestRacik: "",
  dataProfit: null,
  errLogin: "",
};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_REPORT_TRANSACTION":
      return {
        ...state,
        dataReportTransaction: action.payload,
      };
    case "GET_REPORT_JUAL_PRODUCT":
      return {
        ...state,
        dataReportJualProduct: action.payload,
      };
    case "GET_REPORT_JUAL_BAHAN_BAKU":
      return {
        ...state,
        dataReportJualBahanBaku: action.payload,
      };
    case "GET_PROFIT_DATA":
      return {
        ...state,
        dataProfit: action.payload,
      };
    case "GET_BEST_PRODUCT":
      return {
        ...state,
        dataBestProduct: action.payload,
      };
    case "GET_BEST_RACIKAN":
      return {
        ...state,
        dataBestRacik: action.payload,
      };
    case "REPORT_ERR":
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

export default reportReducer;
