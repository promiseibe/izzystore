import { Navbar } from '@/app/component/Navbar';
import ProductDetails from '@/app/component/ProductDetails';
import { fetchProductById } from '@/utils/action/product.action';

import React from 'react'

const page = async ({params}: {params:Promise<{id: string}>}) => {
    const {id} = await params;
    const products = await fetchProductById(id);
    console.log(products);
    
    if (!products) {
        return <div>Product not found</div>;
    }

  return (
    <div>
     
        <ProductDetails product={products} />
    </div>
  )
}

export default page