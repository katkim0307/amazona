import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Home, Product, Cart, Login, Register, Products, Shipping, Payment, PlaceOrder } from './components/';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from './actions/productActions';

function App(props) {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(listProducts(category));
  //   return () => {};
  // }, [category]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(listProducts(searchKeyword, sortOrder));
  };

  const handleSort = e => {
    setSortOrder(e.target.value);
    dispatch(listProducts(searchKeyword, sortOrder));
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">amazona</Link>
          </div>
          <div className="search-bar">
            <form onSubmit={handleSubmit}>
              <input name="searchKeyword" onChange={e=>setSearchKeyword(e.target.value)} />
              <button type="submit" className="button Primary">Search</button>
              <select name="sortOrder" onChange={handleSort}>
                <option value="">Newest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </form>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart | </Link>
            {userInfo ? (<Link to="/account">{userInfo.name}</Link>) : (<Link to="/login">Login</Link>)}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-btn" onClick={closeMenu}>x</button>
          <ul>
            <li><a href="index.html">Fan</a></li>
            <li><a href="index.html">Airconditioner</a></li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={Home} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/products" component={Products} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
