import React, { useEffect } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { describeProduct } from '../actions/productActions';


export default function Product(props) {
    // console.log(props.match.params.id);
    // const product = data.products.find(item => item._id === props.match.params.id);
    // console.log(product);

    const productDetails = useSelector(state => state.productDetails);
    // console.log(productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(describeProduct(props.match.params.id)); 
        return () => { };
    }, []);

    return (
        <div>
            <div className="back-to-result"><Link to='/'>Back to result</Link></div>
            {loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                    (
                        <div className="product-details">
                            <div className="product-details-image">
                                <img src={product.image} alt='product' />
                            </div>
                            <div className="product-details-info">
                                <ul key={product._id}>
                                    <li><h4>{product.name}</h4></li>
                                    <li>{product.rating} Stars ({product.numReviews} reviews)</li>
                                    <li>Price: <b>${product.price}</b></li>
                        Description:
                        <div>{product.description}</div>
                                </ul>
                            </div>
                            <div className="product-details-action">
                                <ul key={product._id}>
                                    <li>Price: ${product.price}</li>
                                    <li>Status: {product.status}</li>
                                    <li>Qty: <select><option>1</option></select></li>
                                    <li><button className="button">Add to cart</button></li>
                                </ul>
                            </div>
                        </div>

                    )
            }
        </div>
    )
};