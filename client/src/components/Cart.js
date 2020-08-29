import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

export default function Cart(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    // console.log(cartItems);

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty)); // action
        }
    }, []);

    const handleDeleteFromCart = (productId) => {
        dispatch(deleteFromCart(productId));
    };

    const handleCheckout = () => {
        props.history.push("/login?redirect=shipping");
    }

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>SHOPPING CART</h3>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? <div>Cart is empty</div> :
                        cartItems.map(item =>
                            <li key={item.product}>
                                <div className="cart-image">
                                    <Link to={"/product/" + item.product}><img src={item.image} alt='product' /></Link>
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>{item.name}</Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(count =>
                                                <option key={count + 1} value={count + 1}>{count + 1}</option>
                                            )}
                                        </select>
                                        <button type="button" className="button" onClick={() => handleDeleteFromCart(item.product)}>Delete</button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((total, current) => total + current.qty, 0)} items)
                    : ${cartItems.reduce((total, current) => total + current.price * current.qty, 0)}
                </h3>
                <button className="button primary" disabled={cartItems.length === 0} onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};