import React, { createContext, useEffect, useState } from "react";

const InvoiceContext = createContext({});

const InvoiceContextProvider = ({ children }) => {
  const [serviceList, setServicesLists] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const fetchApi = async (type) => {
    var res = await fetch(
      `https://script.google.com/macros/s/AKfycbznD43cVjj4zMHPezhGZQmFjLGr8RiacVRVUmoyt5F_Sy2fS5qER6Rhp5YcOszE-qkW/exec?type=${type}`
    );
    var data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchApi("Products").then((data) => {
      setProductsList(data.data);
    });
    fetchApi("Services").then((data) => {
      setServicesLists(data.data);
    });
  }, []);

  const [invoice, setInvoice] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    technicianName: "",
    technicianPhone: "",
    services: [],
    products: [],
    subTotal: 0,
    discount: 0,
    total: 0,
  });
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    console.log(invoice);
  }, [invoice]);

  const updateInvoice = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  // service methods

  const addService = (service) => {
    setInvoice((prevState) => ({
      ...prevState,
      services: [...prevState.services, service],
    }));
  };

  const removeService = (idx) => {
    var services = invoice.services;
    services.splice(idx, 1);
    setInvoice((prevState) => ({
      ...prevState,
      services: services,
    }));
  };

  //service quantity

  const upadateServiceQuantity = (idx,qty) => {
    var services = invoice.services;
    var price = services[idx]["price"];
    var prevQty = services[idx]["qty"] || 1;
    services[idx]["qty"] = qty;
    services[idx]["price"] = (price/prevQty) * qty;
    setInvoice((prevState) => ({
      ...prevState,
      services: services,
    }));
  }

  // product methods

  const addProduct = (product) => {
    console.log(product);
    setInvoice((prevState) => ({
      ...prevState,
      products: [...prevState.products, product],
    }));
  };

  const removeProduct = (idx) => {
    var products = invoice.products;
    products.splice(idx, 1);
    setInvoice((prevState) => ({
      ...prevState,
      products: products,
    }));
  };

  //product quantity

  const upadateProductQuantity = (idx,qty) => {
    var products = invoice.products;
    var price = products[idx]["price"];
    var prevQty = products[idx]["qty"] || 1;
    products[idx]["qty"] = qty;
    products[idx]["price"] = (price/prevQty) * qty;

    setInvoice((prevState) => ({
      ...prevState,
      products: products,
    }));
  }

  //total method
  const updateTotal = (total) => {
    setInvoice({ ...invoice, total: total });
  };
  const updateSubTotal = (subTotal) => {
    setSubtotal(subTotal);
  };

  const updateDiscount = (discount) => {
    setInvoice({ ...invoice, discount: discount });
  };

  useEffect(() => {
    setInvoice({ ...invoice, subTotal: subtotal });
  }, [subtotal]);

  // dispatch

  const value = {
    invoice,
    serviceList,
    productsList,
    updateInvoice,
    addService,
    removeService,
    addProduct,
    removeProduct,
    updateTotal,
    updateSubTotal,
    updateDiscount,
    upadateServiceQuantity,
    upadateProductQuantity
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
export { InvoiceContext };
