
import Headerslider from './component/Headerslider'
import HomeProducts from './component/HomeProducts';
import { fetchProducts } from '@/utils/action/product.action';
import HospitalitySolutions from './component/HospitalitySolutions';
 
export const dynamic = "force-dynamic";
 
const page = async () => {
const all_products = await fetchProducts();
 
  return (
    <div>
     <Headerslider/>
     <HomeProducts products = {all_products}/>
     <HospitalitySolutions/>
    </div>
  )
}

export default page