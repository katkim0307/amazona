import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer, productAddReducer, productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: { cartItems, shipping: {}, billing: {}, payment: {} }, userLogin: { userInfo } };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    productAdd: productAddReducer,
    productDelete: productDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
// thunk is a middleware for redux - it allows async operation inside action of redux

export default store;