import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';

export default function OrderScreenList(props) {

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    const deleteHandler = (order) => {
        //todo
    } 
    return (
        <div>
            <h1>Orders</h1>
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
                            <th>Delivered</th>
                            <th>Paid</th>
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
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10): 'No'}</td>
                                <td>
                                    <button type = "button" className = "small" onClick = {() => props.history.push(`/order/${order._id}`)}>Details</button>
                                    <button type="button" className="small" onClick={() => deleteHandler(order)}> Delete </button>
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
