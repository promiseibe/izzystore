
import Headerslider from './component/Headerslider'
import HomeProducts from './component/HomeProducts';
import { fetchProducts } from '@/utils/action/product.action';
 const all_products = await fetchProducts();

 
const page = async () => {

 
  return (
    <div>
     <Headerslider/>
     <HomeProducts products = {all_products}/>
    </div>
  )
}

export default page