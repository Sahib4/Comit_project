import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts } from '../actions/productsAction';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
   const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);
    const deleteHandler = () => {
        // TODO
    }
    return (
        <div>
            <h1>Products</h1>
            {loading? <LoadingBox></LoadingBox>
             :
            error? <Messagebox variant = "danger">{error}</Messagebox>
             :
             <table className="table">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Price</th>
                         <th>Category</th>
                         <th>Brand</th>
                         <th>Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                     {products.map((product) => (
                         <tr key = {product._id}>
                             <td>{product._id}</td>
                             <td>{product.name}</td>
                             <td>{product.price}</td>
                             <td>{product.category}</td>
                             <td>{product.brand}</td>
                             <td>
                                <button type = "button" className = "small" onClick = {() => props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                                <button type = "button" className = "small" onClick = {() => deleteHandler(product)}>Delete</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
             }

        </div>
    )
}
