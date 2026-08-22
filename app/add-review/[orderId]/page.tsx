import ReviewOrderPage from '@/app/component/ReviewOrder';
import { fetchOrderById } from '@/utils/action/order.action';
import React from 'react'

const Addreview = async ({params}: {params: Promise<{orderId: string}>}) => {
    const {orderId} = await params;
    const orderData = await fetchOrderById(orderId);
  return <ReviewOrderPage orderData={orderData} />
}

export default Addreview