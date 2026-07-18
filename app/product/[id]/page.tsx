import ProductDetails from '@/app/component/ProductDetails';
import { fetchProductById } from '@/utils/action/products.action';
import React from 'react'

const page = async ({params}: {params:Promise<{id: string}>}) => {
    const {id} = await params;
    const product = await fetchProductById(id);
  return (
    <div>
        <ProductDetails product={product} />
    </div>
  )
}

export default page