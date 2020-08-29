import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL
} from '../constants/userConstants';
import Axios from 'axios';
import Cookie from 'js-cookie';

const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/login', { email, password });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { data } });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({ type: USER_LOGIN_FAIL, payload: err.message });
    }
};

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const { data } = await Axios.post('/api/users/register', { name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: { data } });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({ type: USER_REGISTER_FAIL, payload: err.message });
    }
};

export { login, register };