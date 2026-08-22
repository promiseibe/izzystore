import { fetchAddresses } from '@/utils/action/address.action';
import React from 'react'
import CartPage from '../component/CartPage';

const cartPage = async() => {
    const addresses = await fetchAddresses();
  return <CartPage addresses={addresses}/>
}

export default cartPage