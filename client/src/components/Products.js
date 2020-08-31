import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, listProducts, deleteProduct } from '../actions/productActions';

export default function Products(props) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    const productAdd = useSelector(state => state.productAdd);
    const { loading: loadingAdd, succcess: successAdd, error: errorAdd } = productAdd;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, succcess: successDelete, error: errorDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successAdd) { setModalVisible(false); }
        dispatch(listProducts());
        return () => { };
    }, [successAdd, successDelete]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addProduct({ _id: id, name, category, image, price, brand, description, countInStock }));
    };

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setCategory(product.category);
        setImage(product.image);
        setPrice(product.price);
        setBrand(product.brand);
        setDescription(product.description);
        setCountInStock(product.countInStock);
    };

    const handleDelete = product => {
        dispatch(deleteProduct(product._id));
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button" onClick={() => openModal({})}>Add Item</button>
            </div>
            {modalVisible &&
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
                                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="category">Category</label>
                                <input type="text" name="category" id="category" value={category} onChange={e => setCategory(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="image">Image</label>
                                <input type="text" name="image" id="image" value={image} onChange={e => setImage(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="price">Price</label>
                                <input type="text" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="brand">Brand</label>
                                <input type="text" name="brand" id="brand" value={brand} onChange={e => setBrand(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="countInStock">Item Quantity</label>
                                <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                            </li>
                            <li>
                                <button type="submit" className="button primary">{id ? 'Update' : 'Add'}</button>
                            </li>
                            <li>
                                <button type="button" className="button secondary" onClick={() => setModalVisible(false)}>Cancel</button>
                            </li>
                        </ul>
                    </form>
                </div>
            }
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Count</th>
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
                                <td>{product.countInStock}</td>
                                <td>
                                    <button className="button" onClick={() => openModal(product)}>Update</button>
                                    {' '}
                                    <button className="button" onClick={() => handleDelete(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};