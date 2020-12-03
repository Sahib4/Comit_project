import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts, createProduct } from '../actions/productsAction';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const productCreate = useSelector(state => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;
   const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        dispatch(listProducts())
    }, [createdProduct,dispatch,props.history, successCreate]);
    const deleteHandler = () => {
        // TODO
    }

    const createHandler =() => {
        dispatch(createProduct());
    }
    return (
        <div>
            <div className = "row">
                <h1>Products</h1>
                <button type = "button" className = "primary" onClick={createHandler}>Create Product</button>
            </div>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <Messagebox variant = "danger">{error}</Messagebox>}
            {loading? <LoadingBox ></LoadingBox>
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
