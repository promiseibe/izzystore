import OrderPage from '@/app/component/OrderPage';
import { fetchOrderById } from '@/utils/action/order.action';
import React from 'react'

const OrderIdpage = async ({params}: {params: Promise<{orderId: string}>}) => {
  const {orderId} = await params;
  const orderData = await fetchOrderById(orderId);

    return <OrderPage orderData={orderData} />
}

export default OrderIdpage