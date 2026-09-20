import ProductDetails from '@/app/component/ProductDetails';
import { fetchProductById } from '@/utils/action/product.action';


const page = async ({params}: {params:Promise<{id: string}>}) => {
    const {id} = await params;
    // fetching product by id
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