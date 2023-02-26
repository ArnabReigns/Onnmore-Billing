import React, { useContext, useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { InvoiceContext } from '../Context/InvoiceContext'
import Service from './Service';
import { getCategories } from '../functions/functions';


const ServiceContainer = () => {

    const {serviceList,addService,invoice} = useContext(InvoiceContext);
    const [categories,setCategories] = useState([]);
    const [filteredService,setFilteredService] = useState([]);
    const [service,setService] = useState({});

   
    useEffect(()=>{
        setCategories(prev=>getCategories(serviceList));
    },[serviceList]);
    
    useEffect(()=>{
        var arr = serviceList.filter(service => service.category === categories[0].name);
        setFilteredService(arr);
    },[categories]);


    useEffect(()=>{
        setService(filteredService[0]);
    },[filteredService]);
    
    
    
    const setupService = (e) => {
        var {name,value} = e.target;        
        if(name == 'service') {
            setService(serviceList.find(service=> service.name == value));
        }
        else if(name == 'category') {
            setFilteredService(serviceList.filter(service => service.category === value));
        }
    };


    return (
    <div className='serviceContainer'>
    {invoice.services.map((service,idx) => <Service key={idx} id={idx} service={service}/> )}
    
    <div className="menu-container">
        <Dropdown disabled={!filteredService.length} name='category' items={categories} cb={setupService} value={service?.category}/>
        <Dropdown  disabled={!filteredService.length} name='service' items={filteredService} cb={setupService} value={service?.name}/>
        <button disabled={!filteredService.length} onClick={()=> addService(service)}>Add</button>
    </div>
    </div>
  )
}

export default ServiceContainer