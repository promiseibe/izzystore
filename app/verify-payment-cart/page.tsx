import { redirect, } from 'next/navigation';
import { checkOrder } from '@/utils/action/order.action';
import { VerifyPayCart } from '../component/VerifyPayCarts';


const VerifyPaymentCart = async ({searchParams}:{searchParams:Promise<{[key: string]: string}>}) => {
  const {reference} = await searchParams;
  const orderExist = await checkOrder(reference);
  
  // Guard against undefined/null response from checkOrder
  if (orderExist && orderExist.length > 0 ) {
    redirect("/")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/verifyPayment/${reference}`)
  const result = await response.json();
  console.log(result);
  
    return <VerifyPayCart reference = {reference} amount={result.data.amount} email={result.data.customer.email}/>
}

export default VerifyPaymentCart