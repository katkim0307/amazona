import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";
import axios from 'axios';

const listProducts = () => async (dispatch) => {
    try {
        // action 1 - request
        dispatch({ type: PRODUCT_LIST_REQUEST });
        // send ajax request to the server
        const { data } = await axios.get('api/products');
    
        // action 2 - if success
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } 
    catch (err) {
        // action 3 - if fail
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.message});
    }
};

export { listProducts };