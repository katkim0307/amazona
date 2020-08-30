import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

// A ROUTER TO GET A LIST OF PRODUCTS (as a user)
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// AN API ROUTER TO CREATE A PRODUCT
router.post('/', isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
        countInStock: req.body.countInStock,
    });

    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Item Added.', data: newProduct });
    }
    return res.status(500).send({message: 'Error in creating a new item.'});
});

export default router;