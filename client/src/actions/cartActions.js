import Axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_BILLING } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get('/api/products/' + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                brand: data.brand,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            }
        });
        const { cart: { cartItems } } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    }
    catch (err) {

    }
};

const deleteFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const saveBilling = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_BILLING, payload: data });
};

export { addToCart, deleteFromCart, saveShipping, saveBilling };