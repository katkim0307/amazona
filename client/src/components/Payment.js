import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

export default function Payment(props) {
    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();
    console.log(paymentMethod);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        props.history.push('/placeorder');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment</h2>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={e => setPaymentMethod(e.target.value)}></input>
                                <label htmlFor="paymentMethod">Paypal</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Next</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
};