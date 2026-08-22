import { fetchAllOrders } from '@/utils/action/order.action';
import React from 'react'
import UserOrders from '../component/UserOrders';

const OrderPage = async () => {
    const userOrders = await fetchAllOrders();
    return <UserOrders userOrders={userOrders} />
}

export default OrderPage