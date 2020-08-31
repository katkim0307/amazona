import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL,
} from "../constants/productConstants";
import Axios from 'axios';

const listProducts = () => async (dispatch) => {
    try {
        // action 1 - request
        dispatch({ type: PRODUCT_LIST_REQUEST });
        // send ajax request to the server
        const { data } = await Axios.get('api/products');

        // action 2 - if success
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (err) {
        // action 3 - if fail
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
    }
};

const describeProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await Axios.get('/api/products/' + productId);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    }
    catch (err) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message });
    }
};

const addProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_ADD_REQUEST, payload: product });
        const { userLogin: { userInfo } } = getState();
        // FOR ADDING A NEW ITEM
        if (!product._id) {
            const { data } = await Axios.post('/api/products', product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
        } 
        // FOR UPDATING THE ITEM
        else {
            const { data } = await Axios.put('/api/products/' + product._id, product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
        }
    } catch (err) {
        dispatch({ type: PRODUCT_ADD_FAIL, payload: err.message });
    }
};

export { listProducts, describeProduct, addProduct };