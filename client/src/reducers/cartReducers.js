import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_BILLING, CART_SAVE_PAYMENT } from '../constants/cartConstants';

function cartReducer(state = { cartItems: [], shipping: {}, billing: {}, payment: {} }, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(i => i.product === item.product);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(i => i.product === product.product ? item : i)
                };
            }
            return { cartItems: [...state.cartItems, item] };
        case CART_REMOVE_ITEM:
            return {
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        case CART_SAVE_SHIPPING:
            return {
                ...state, shipping: action.payload
            }
        case CART_SAVE_BILLING:
            return {
                ...state, billing: action.payload
            }
        case CART_SAVE_PAYMENT:
            return {
                ...state, payment: action.payload
            }

        default:
            return state;
    }
}

export { cartReducer };