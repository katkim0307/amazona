import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home(props) {
    // console.log(data.products);

    // define an express hook
    const [products, setProduct] = useState([]);

    // fetch data from server
    useEffect(() => {
        // EFFECT: only run at componentDidMount()
        const fetchData = async () => {
            const { data } = await axios.get("/api/products");
            setProduct(data);
        }
        fetchData();

        return () => {
            // CLEANUP
        };
    }, [/*input*/]);

    return (
        <div>
            <ul className="products">
                {
                    products.map(product =>
                        <li key={product._id}>
                            <div className="product">
                                <Link to={'/product/' + product._id}><img className="product-image" src={product.image} alt="product" /></Link>
                                <div className="product-name">
                                    <Link to={'/product/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">${product.price}</div>
                                <div className="product-rating">{product.rating} Stars {product.numReviews} Reviews</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};