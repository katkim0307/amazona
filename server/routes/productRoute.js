import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

// A ROUTER TO GET A LIST OF PRODUCTS (as a user)
router.get('/', async (req, res) => {
    // const category = req.query.category ? { category: req.query.category } : {};

    const searchKeyword = req.query.searchKeyword ?
        {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        } : {};
    const sortOrder = req.query.sortOrder ?
        req.query.sortOrder === 'lowest' ? 
        { price: -1 } : { price: 1 } : { _id: -1 };
    
    const products = await Product.find({...searchKeyword}).sort(sortOrder);
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product)
        res.send(product);
    else
        res.send(404).send({ msg: 'Item not found.' });
})

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
    return res.status(500).send({ message: 'Error in creating a new item.' });
});

// ROUTER TO UPDATE/EDIT THE PRODUCT
router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.category = req.body.category;
        product.image = req.body.image;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.description = req.body.description;
        product.countInStock = req.body.countInStock;

        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Item Updated.', data: updatedProduct });
        }
        return res.status(500).send({ message: 'Error in updating the item.' });
    }
});

// ROUTER TO DELETE THE PRODUCT
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: 'Item deleted.' });
    } else {
        res.send('Error in deteling the item.');
    }
});

export default router;