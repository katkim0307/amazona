import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.get('/createAdmin', async (req, res) => {
    try {
        const user = new User({
            name: 'Kat',
            email: 'katkim0307@gmail.com',
            password: '1234',
            isAdmin: true,
        });

        // save the new user
        const newUser = await user.save();
        res.send(newUser);
    }
    catch (err) {
        res.send({ msg: err.message });
    }
});

router.post('/login', async (req, res) => {
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (loginUser) {
        res.send({
            _id: loginUser.id,
            name: loginUser.name,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
            // send back a token (identifier that can 
            // recognize whether or not the next request is authenticated)
            token: getToken(loginUser),
        });
    } else {
        res.status(401).send({ msg: 'Invalid email or password.' });
    }
});

export default router;