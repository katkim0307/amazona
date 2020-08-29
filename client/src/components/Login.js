import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {

        };
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <ul className="form-container">
                    <li><h2>Login</h2></li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label for="password">Password</label>
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
                        <button type="submit" className="button secondary"><Link to="/signup">Create your account</Link></button>
                    </li>
                </ul>
            </form>     
        </div>
    )
};