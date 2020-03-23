import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import fakeData from './fakeData'
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductDetail from './component/ProductDetail/ProductDetail';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import { AuthContextProvider, PrivateRoute } from './component/Login/userAuth';
import OrderComplete from './component/OrderComplete/OrderComplete';


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>

            <Route exact path="/">
              <Shop></Shop>
            </Route>

            <Route path="/shop">
              <Shop></Shop>
            </Route>

            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/place-order">
              <OrderComplete></OrderComplete>
            </Route>
            
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>

          </Switch>
        </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
