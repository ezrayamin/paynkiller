import {combineReducers} from 'redux'

import userReducer from './userReducer'
import adminReducer from './adminReducer'
import cartReducer from './cartReducer'
import {categoryReducer} from './categoryReducer'
import brandReducer from './brandReducer'
import uomReducer from './uomReducer'
import productReducer from './productReducer'
import reportReducer from './reportReducer'
import rawMaterialReducer from './rawMaterialReducer'
import stockRawMaterialReducer from './stokRawMaterialReducer'
import stockProdukReducer from './stokProdukReducer'
import orderReducer from './orderReducer'
import customOrderReducer from './customOrderReducer'
import historyUserReducer from './historyUserReducer'

const allReducer = combineReducers({
    userReducer,
    adminReducer,
    cartReducer,
    categoryReducer,
    reportReducer,
    brandReducer,
    uomReducer,
    productReducer,
    rawMaterialReducer,
    stockRawMaterialReducer,
    stockProdukReducer,
    orderReducer,
    customOrderReducer,
    historyUserReducer
})

export default allReducer