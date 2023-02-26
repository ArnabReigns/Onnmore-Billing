import React, { useContext } from "react";
import { InvoiceContext } from "../Context/InvoiceContext";

const InputField = (props) => {
  const { invoice, updateInvoice } = useContext(InvoiceContext);

  return (
    <input
      required
      name={props?.name}
      type={props?.type || "text"}
      placeholder={props.placeHolder}
      value={invoice[props.name]}
      max={props?.max}
      onChange={updateInvoice}
    />
  );
};

export default InputField;
