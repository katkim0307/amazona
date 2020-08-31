import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, listProducts } from '../actions/productActions';

export default function Products(props) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    const productAdd = useSelector(state => state.productAdd);
    const { loading: loadingAdd, succcess: successAdd, error: errorAdd } = productAdd;
    const dispatch = useDispatch();

    useEffect(() => {
        // if (successAdd) {setModalVisible(false)};
        dispatch(listProducts());
        return () => { };
    }, [/*successAdd*/]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addProduct({ name, category, image, price, brand, description, countInStock }));
    };

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary">Add Item</button>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <ul className="form-container">
                        <li><h2>Add New Item</h2></li>
                        <li>
                            {loadingAdd && <div>Loading...</div>}
                            {errorAdd && <div>{errorAdd}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="category">Category</label>
                            <input type="text" name="category" id="category" onChange={e => setCategory(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">Image</label>
                            <input type="text" name="image" id="image" onChange={e => setImage(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input type="text" name="price" id="price" onChange={e => setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" onChange={e => setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" onChange={e => setDescription(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="countInStock">Item Quantity</label>
                            <input type="text" name="countInStock" id="countInStock" onChange={e => setCountInStock(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button primary">
                                Add
                        </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <button className="button">Edit</button>
                                    {' '}
                                    <button className="button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};