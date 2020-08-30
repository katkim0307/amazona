import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute'

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch(err => console.log(err.reason));

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoute);

/* STATIC ROUTERS FOR GETTING DATA
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(item => item._id === productId);
    if(product) 
        res.send(product);
    else
        res.status(404).send({msg: "Product Not Found"});
});
*/

// IMPLEMENTING FROM MONGODB RATHER THAN STATIC
app.use('/api/products', productRoute);

app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
})