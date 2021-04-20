import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import Pages
import RegisterScreen from './pages/registerscreen'
import HomeScreen from './pages/homescreen'
import ProfileScreen from './pages/ProfileScreen'
import FPassScreen from './pages/ForgotPassScreen'
import LoginScreen from './pages/loginscreen'
import AdminLoginScreen from './pages/adminLoginScreen'
import ChangePassScreen from './pages/changepassScreen'
import DetailProdukScreen from './pages/detailProduckScreen'
import CartScreen from './pages/cartscreen'
import CheckoutScreen from './pages/checkoutScreen'
import MasterCategory from './pages/masterCategory'
import DashboardScreen from './pages/dashboard'
import MasterBrandScreen from './pages/masterBrands'
import MasterUomScreen from './pages/masterUom'
import MasterRawMaterialScreen from './pages/masterRawMaterial'
import MasterProductScreen from './pages/masterProduct'
import MasterAdminScreen from './pages/masterAdmin'
import ManagementStockProductScreen from './pages/stokProduk'
import ManagementStockRawMaterialScreen from './pages/stokRawMaterial'
import ProductListScreen from './pages/productListScreen'

import OrderScreen from './pages/orderScreen'
import CustomOrderAdminScreen from './pages/customOrderAdmin'
import OrderRawMaterials from './pages/orderRawMaterials'

import CustomOrderScreen from './pages/customOrderScreen'
import ShowCustomOrderScreen from './pages/showCustomOrderScreen'
import ReportTransactionScreen from './pages/reportTransaction'
import ReportProductSaleScreen from './pages/reportSaleProduct'
import UserHistoryScreen from './pages/historyUserScreen'


import {useDispatch} from 'react-redux'



//import actions
import { keeplogin, keepLoginAdmin } from './action'

export default function App() {
  const dispatch = useDispatch()
  React.useEffect(()=> {
      dispatch(keeplogin())
      dispatch(keepLoginAdmin())
  },[])

  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/cart' component={CartScreen}/>
        <Route path='/checkout' component={CheckoutScreen}/>
        <Route path='/login' component={LoginScreen} />
        <Route path='/loginadmin' component={AdminLoginScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/forgotpass' component={FPassScreen} />
        <Route path='/changePass' component={ChangePassScreen} />
        <Route path='/detailproduk' component={DetailProdukScreen} />
        <Route path='/admin/master/category' component={MasterCategory}/>
        <Route path='/admin/dashboard' component={DashboardScreen} />
        <Route path='/admin/master/brand' component={MasterBrandScreen} />
        <Route path='/admin/master/uom' component={MasterUomScreen} />
        <Route path='/admin/master/rawmaterial' component={MasterRawMaterialScreen} />
        <Route path='/admin/master/product' component={MasterProductScreen} />
        <Route path='/admin/stock/rawmaterial' component={ManagementStockRawMaterialScreen} />
        <Route path='/admin/stock/product' component={ManagementStockProductScreen} />
        <Route path='/admin/order/allorder' component={OrderScreen} />
        <Route path='/admin/order/customorder' component={CustomOrderAdminScreen} />
        <Route path='/admin/master/admin' component={MasterAdminScreen} />
        <Route path='/admin/report/transaction' component={ReportTransactionScreen} />
        <Route path='/admin/report/stocksale' component={ReportProductSaleScreen} />
        <Route path='/products' component={ProductListScreen} />

        <Route path='/ordermaterials' component={OrderRawMaterials}/>

        <Route path='/customOrder' component={CustomOrderScreen} />
        <Route path='/ShowCustomOrder' component={ShowCustomOrderScreen} />
        <Route path='/historyUser' component={UserHistoryScreen} />

      </Switch>
    </div>
  )
}
