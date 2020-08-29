import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push('/');
        }
        return () => { };
    }, [userInfo]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(register(name, email, password));
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <ul className="form-container">
                    <li><h2>Register</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="name" name="name" id="name" onChange={e => setName(e.target.value)} />
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
                        <label htmlFor="rePassword">Re-enter Password</label>
                        <input type="rePassword" name="rePassword" id="rePassword" onChange={e => setRePassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            Register
                        </button>
                    </li>
                    <li>
                        Already have an account?
                    </li>
                    <li>
                        <button type="submit" className="button secondary"><Link to="/login">Login</Link></button>
                    </li>
                </ul>
            </form>
        </div>
    );
};