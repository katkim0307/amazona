import express from 'express';
import User from '../models/userModel';

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

export default router;