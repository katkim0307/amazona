import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776; {/*  ASCII code for the sidebar menu icon --> */}
                </button>
                <a href="index.html">amazona</a>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
                <a href="login.html">Login</a>
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
                <ul className="products">
                    <li>
                        <div className="product">
                            <img className="product-image" src="fan1.jpg" alt="fan 1" />
                            <div className="product-name">
                                <a href="product.html">Mini Handheld Portable Fan</a>
                            </div>
                            <div className="product-brand">IPOW</div>
                            <div className="product-price">$13.99</div>
                            <div className="product-rating">4.8 stars (625 reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="fan2.jpg" alt="fan 2" />
                            <div className="product-name">
                                <a href="product.html">Mini Flexible Tripod Clip On Fan</a>
                            </div>
                            <div className="product-brand">Amacool</div>
                            <div className="product-price">$19.99</div>
                            <div className="product-rating">4.9 stars (2,589 reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="fan3.jpg" alt="fan 3" />
                            <div className="product-name">
                                <a href="product.html">Portable Neck Fan</a>
                            </div>
                            <div className="product-brand">COMLIFE</div>
                            <div className="product-price">$19.99</div>
                            <div className="product-rating">4.5 stars (1,623 reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="https://images-na.ssl-images-amazon.com/images/I/51kxZt06SUL._AC_SL1000_.jpg" alt="fan 4" />
                            <div className="product-name">
                                <a href="product.html">Lady Handheld Portable Fan</a>
                            </div>
                            <div className="product-brand">JENTXON</div>
                            <div className="product-price">$13.99</div>
                            <div className="product-rating">4.4 stars (869 reviews)</div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
    </div>
  );
}

export default App;
