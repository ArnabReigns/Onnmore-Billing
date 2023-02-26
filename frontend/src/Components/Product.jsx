import React, { useContext } from 'react'
import { InvoiceContext } from '../Context/InvoiceContext'

const Product = (props) => {
  
  const {removeProduct} = useContext(InvoiceContext);
  
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
        <button onClick={()=>removeProduct(props?.id)}>delete</button>
    </div>
  )
}

export default Product