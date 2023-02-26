import React, { useContext } from 'react'
import { InvoiceContext } from '../Context/InvoiceContext'

const Service = (props) => {
  
  const {removeService} = useContext(InvoiceContext);
  
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
        <button onClick={()=>removeService(props.id)}>delete</button>
    </div>
  )
}

export default Service