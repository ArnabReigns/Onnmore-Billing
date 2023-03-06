import React, { useContext } from 'react'
import { InvoiceContext } from '../Context/InvoiceContext'
import QuantityBox from './QuantityBox';

const Service = (props) => {
  
  const {removeService,upadateServiceQuantity} = useContext(InvoiceContext);

  function upadateQty(qty)
  {
    upadateServiceQuantity(props.id,qty);
  };
  
  
  return (
    <div className='service'>
        <div className="pair">
        <h1>Service</h1>
        <h2>{props.service.name}</h2>
        </div>
        <div className="pair">

        <h1>Category</h1>
        <h2>{props.service.category}</h2>
        </div>
        <div className="pair">
        <h1>Price</h1>
        <h2>{props.service.price} rs.</h2>
        </div>
        <div className="btnCont">
          <QuantityBox cb={upadateQty}/>
          <button onClick={()=>removeService(props.id)}>delete</button>
        </div>
    </div>
  )
}

export default Service