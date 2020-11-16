import React from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import cartScreen from './screens/cartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from './actions/userActions';


function App() {
const cart =  useSelector((state) => state.cart);
const {cartItems} = cart;
const userSignin = useSelector((state) => state.userSignin);
const {userInfo} = userSignin;
const dispatch = useDispatch();
const signoutHandler = () => {
  dispatch(signout);
}

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
                {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            </div>
        </header>

        <main>
          <Route path="/cart/:id?" component={cartScreen}></Route>
          <Route path = "/product/:id" component ={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/" component = {HomeScreen} exact></Route>
          
        </main>

        <footer className="row center"> All rights resvered </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
