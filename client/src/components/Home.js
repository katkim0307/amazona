import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function Home(props) {
    // console.log(data.products);

    // if using an express hook
    /* const [products, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/products");
            setProduct(data);
        }
        fetchData();
        
        return () => {};
    }, []);*/

    const productList = useSelector(state => state.productList);
    // console.log(productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    // fetch data from server
    useEffect(() => {
        // EFFECT: only run at componentDidMount()
        dispatch(listProducts());  // actions

        return () => {
            // CLEANUP
        };
    }, [/*input*/]);

    return (
        loading ? <div>Loading...</div> : 
        error ? <div>{error}</div> : 
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