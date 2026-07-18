import React from 'react';
import Navbar from './component/Navbar'
import Headerslider from './component/Headerslider'
import { fetchProduct } from '@/utils/action/products.action';
import HomeProducts from './component/HomeProducts';
import Footer from './component/Footer';



 const all_products = await fetchProduct();

 console.log(all_products)
const page = () => {
 
  return (
    <div>
      <Navbar/>
     <Headerslider/>
     <HomeProducts products = {all_products}/>
     <Footer/>
    </div>
  )
}

export default page