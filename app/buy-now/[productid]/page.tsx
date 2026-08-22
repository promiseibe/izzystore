import BuyNow from '@/app/component/BuyNowPage';
import { ProductParams } from '@/shared.types';
import { fetchAddresses } from '@/utils/action/address.action';
import { fetchProductById } from '@/utils/action/product.action';

import React from 'react'

 const BuyNowPages = async ({params}: {params: Promise<{productid: string}>}) => {
    const {productid} = await params;
    const product = await fetchProductById(productid)
    const addresses = await fetchAddresses();
    if (!product) return <div>Product not found</div>
  
    return <BuyNow product={product} addresses={addresses} />
}

export default BuyNowPages