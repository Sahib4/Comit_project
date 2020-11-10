import React from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import cartScreen from './screens/cartScreen';
import { useSelector } from 'react-redux';


function App() {
const cart =  useSelector((state) => state.cart);
const {cartItems} = cart;

  return (
    <BrowserRouter>
      <div className="grid-container"> 
        <header className="row">
            <div className="brand">
                <Link to="/">Shop</Link>
            </div>

            <div>
                <Link to="/cart">Cart
                {cartItems.length>0 && (
                  <span className = "badge">{cartItems.length}</span>
                )}
                </Link>
                <Link to="/signin">Sign-In</Link>
            </div>
        </header>

        <main>
          <Route path="/cart/:id?" component={cartScreen}></Route>
          <Route path = "/product/:id" component ={ProductScreen}></Route>
          <Route path="/" component = {HomeScreen} exact></Route>
        </main>

        <footer className="row center"> All rights resvered </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
