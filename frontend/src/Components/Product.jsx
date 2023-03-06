import React, { useContext } from 'react'
import { InvoiceContext } from '../Context/InvoiceContext'
import QuantityBox from './QuantityBox';

const Product = (props) => {
  
  const {removeProduct,upadateProductQuantity} = useContext(InvoiceContext);

  function upadateQty(qty)
  {
    upadateProductQuantity(props.id,qty);
  };
  
  return (
    <div className='service'>
        
        <div className="pair">
        <h1>Product Name</h1>
        <h2>{props.product?.name}</h2>
        </div>

        <div className="pair">
        <h1>Price</h1>
        <h2>{props.product?.price} rs.</h2>
        </div>
        <div className="btnCont">
          <QuantityBox cb={upadateQty}/>
          <button onClick={()=>removeProduct(props.id)}>delete</button>
        </div>
    </div>
  )
}

export default Product