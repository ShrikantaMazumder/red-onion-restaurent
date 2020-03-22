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

function App() {
  
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Switch>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/shipment">
            <Shipment></Shipment>
          </Route>
          
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>

        </Switch>
      </Router>  
    </div>
  );
}

export default App;
