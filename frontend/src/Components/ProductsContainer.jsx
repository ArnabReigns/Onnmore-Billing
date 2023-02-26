import React, { useContext, useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { InvoiceContext } from '../Context/InvoiceContext'
import Product from './Product';


const ProductsContainer = () => {

    const {productsList,invoice,addProduct} = useContext(InvoiceContext);

    const [product, setProduct] = useState({});

    useEffect(()=>{
        setProduct(productsList[0]);
        console.log(productsList[0]);
    },[productsList])

    const setupProduct = (e) => {
        var {name,value} = e.target;        
        if(name == 'product') {
            setProduct(productsList.find(product=> product.name == value));
        }
    };

    return (
    <div className='serviceContainer'>

    {invoice.products.map((product,idx) => <Product key={idx} id={idx} product={product}/> )}
    
    <div className="menu-container">
        <Dropdown disabled={!productsList.length} name="product" items={productsList} cb={setupProduct}/>
        <button disabled={!productsList.length} onClick={()=> addProduct(product)}>Add</button>
    </div>
    </div>
  )
}

export default ProductsContainer