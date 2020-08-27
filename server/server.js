import express from 'express';
import data from './data';

const app = express();
const port = 4000;

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})