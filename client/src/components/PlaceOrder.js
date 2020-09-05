import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { Link } from 'react-router-dom';

export default function PlaceOrder(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, billing, payment } = cart;
    if (!shipping || !billing) {
        props.history.push('/shipping');
    } else if (!payment) {
        props.history.push('/payment');
    }

    const itemsPrice = cartItems.reduce((total, current) => total + current.price*current.qty, 0);
    const shippingPrice = 9.99;
    const taxPrice = itemsPrice * 1.08875;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();
    console.log(cart);

    const handlePlaceOrder = () => {
        // CREATE AN ORDER
        props.history.push("/order");
    }

    useEffect(() => { }, []);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping Address</h3>
                        <div>
                            {cart.shipping.shipAddress1} {cart.shipping.shipAddress2} <br />
                            {cart.shipping.shipCity}, {cart.shipping.shipState} {' '} {cart.shipping.shipZipcode}
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method: {cart.payment}
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>Review items and shipping </h3>
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
                                                Qty: {item.qty}
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
                </div>
                <div className="placeorder-action">
                    <ul>
                        <div>
                            <button className="button primary full-width" onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice.toFixed(2)}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice.toFixed(2)}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};