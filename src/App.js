import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Product from './pages/Product';

function App() {
  if (!window.localStorage.getItem('cart')) {
    window.localStorage.setItem('cart', JSON.stringify([]));
  }

  return (
    <BrowserRouter>
      <Route exact path="/online-store/" component={ Home } />
      <Route exact path="/cart" component={ Cart } />
      <Route exact path="/checkout" component={ Checkout } />
      <Route path="/product/:id" component={ Product } />
    </BrowserRouter>
  );
}

export default App;
