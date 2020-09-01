import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // access userLogin from store.js using useSelector
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => { };
    }, [userInfo]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <ul className="form-container">
                    <li><h2>Login</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>Invalid email or password.</div>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            Login
                        </button>
                    </li>
                    <li>
                        New to amazona?
                    </li>
                    <li>
                        <button type="submit" className="button secondary">
                            <Link to={redirect === "/" ? "/register" : "/register?redirect=" + redirect}>Create your account</Link>
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    )
};