import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping, saveBilling } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

export default function Shipping(props) {
    const [shipAddress1, setShipAddress1] = useState('');
    const [shipAddress2, setShipAddress2] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [shipState, setShipState] = useState('');
    const [shipZipcode, setShipZipcode] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [billAddress1, setBillAddress1] = useState('');
    const [billAddress2, setBillAddress2] = useState('');
    const [billCity, setBillCity] = useState('');
    const [billState, setBillState] = useState('');
    const [billZipcode, setBillZipcode] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(saveShipping({ shipAddress1, shipAddress2, shipCity, shipState, shipZipcode }));
        dispatch(saveBilling({ billAddress1, billAddress2, billCity, billState, billZipcode }));

        console.log('shipping: ', shipAddress1, shipAddress2, shipCity, shipState, shipZipcode);
        console.log('billing: ', billAddress1, billAddress2, billCity, billState, billZipcode);
    };

    const handleSameAddress = () => {
        setBillAddress1(shipAddress1);
        setBillAddress2(shipAddress2);
        setBillCity(shipCity);
        setBillState(shipState);
        setBillZipcode(shipZipcode);
    };

    const openModal = data => {
        setModalVisible(true);
        setBillAddress1(data.billAddress1);
        setBillAddress2(data.billAddress2);
        setBillCity(data.billCity);
        setBillState(data.billState);
        setBillZipcode(data.billZipcode);
    };

    return (
        <div>
            <CheckoutSteps step1 step2 />
        <div className="form">
            <form onSubmit={handleSubmit}>
                <ul className="form-container">
                    <li>
                        <h2>Shipping Address</h2>
                    </li>
                    <li>
                        <label htmlFor="shipAddress1">Address Line 1</label>
                        <input type="text" name="shipAddress1" id="shipAddress1" onChange={e => setShipAddress1(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="shipAddress2">Address Line 2</label>
                        <input type="text" name="shipAddress2" id="shipAddress2" onChange={e => setShipAddress2(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="shipCity">City</label>
                        <input type="text" name="shipCity" id="shipCity" onChange={e => setShipCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="shipState">State</label>
                        <input type="text" name="shipState" id="shipState" onChange={e => setShipState(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="shipZipcode">Zipcode</label>
                        <input type="text" name="shipZipcode" id="shipZipcode" onChange={e => setShipZipcode(e.target.value)} />
                    </li>
                    <li>
                        <h3>Is your billing address same as the address above?</h3>
                    </li>
                    <li>
                        <label>
                            Yes<input type="checkbox" onChange={handleSameAddress} /> {' '}
                            No<input type="checkbox" onChange={() => openModal({})} />
                        </label>
                    </li>
                    {modalVisible &&
                        <div className="form">
                            <ul className="form-container">
                                <li>
                                    <h2>Billing Address</h2>
                                </li>
                                <li>
                                    <label htmlFor="billAddress1">Address Line 1</label>
                                    <input type="text" name="billAddress1" id="billAddress1" onChange={e => setBillAddress1(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="billAddress2">Address Line 2</label>
                                    <input type="text" name="billAddress2" id="billAddress2" onChange={e => setBillAddress2(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="billCity">City</label>
                                    <input type="text" name="billCity" id="billCity" onChange={e => setBillCity(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="billState">State</label>
                                    <input type="text" name="billState" id="billState" onChange={e => setBillState(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="billZipcode">Zipcode</label>
                                    <input type="text" name="billZipcode" id="billZipcode" onChange={e => setBillZipcode(e.target.value)} />
                                </li>
                            </ul>
                        </div>
                    }
                    <li>
                        <button type="submit" className="button primary">Next</button>
                    </li>
                </ul>
            </form>
        </div>
        </div>
    );
};