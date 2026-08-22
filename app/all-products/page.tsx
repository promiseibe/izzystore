import React from 'react'
import AllProducts from '../component/AllProducts'
import { fetchProductsAll } from '@/utils/action/product.action'

const allProducts = async() => {
    const products = await fetchProductsAll()
  return <AllProducts products={products}/>
}

export default allProducts