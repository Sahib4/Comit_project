import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../componenets/Products';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';
import { listProducts } from '../actions/productsAction';




export default function HomeScreen() {
  const  dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading,error,products} = productList;

   useEffect(() => {
    dispatch(listProducts());
   }, [dispatch]);
    return (
      <div>
          {loading ? (<LoadingBox></LoadingBox>):
          error ? (<Messagebox varient = "danger">{error}</Messagebox>):
        
        (<div className="row center">
        {products.map((product)=>(
            <Product key={product._id} product={product}></Product>
        ))}
         </div>
        )}

      </div>
    )
}
