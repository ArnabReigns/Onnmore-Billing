import React,{useEffect, useState} from 'react'

const QuantityBox = (props) => {

    const [qty,setQty] = useState(1);

    useEffect(()=>{
      props.cb(qty);
    },[qty])

  return (
    <div className='quantBox'>
        <button className="remove" onClick={()=>setQty(prev=> prev>=2 ? prev-1 : 1)}>-</button>
        <div className='qty'>{qty}</div>
        <button className="add" onClick={()=>setQty(prev=> prev+1)}>+</button>

    </div>
  )
}

export default QuantityBox