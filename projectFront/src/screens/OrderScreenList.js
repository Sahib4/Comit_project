import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderScreenList(props) {

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
          }
    } 
    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <Messagebox variant="danger">{errorDelete}</Messagebox>}
            {loading ? <LoadingBox></LoadingBox> : 
                error? <Messagebox variant = "danger">{error}</Messagebox> :

            (
                <table className = "table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key = {order._id}>
                                <td>{order._id}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? "Yes" : "No"}</td>
                                <td>{order.isDelivered? "Yes" : "No"}</td>
                                <td>
                                    <button type = "button" className = "small" onClick = {() => props.history.push(`/order/${order._id}`)}>Details</button>
                                    <button type="button" className="small"  onClick={() => deleteHandler(order)}> Delete </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}
