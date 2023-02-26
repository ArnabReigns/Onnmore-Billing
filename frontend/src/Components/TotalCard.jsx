import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../Context/InvoiceContext";

const TotalCard = () => {
  const { invoice, updateTotal, updateSubTotal, updateDiscount } =
    useContext(InvoiceContext);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [GST, setGST] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let total = 0;
    invoice.services.forEach((item) => {
      total += item?.price;
    });
    invoice.products.forEach((item) => {
      total += item?.price;
    });
    setSubtotal(total.toFixed(2));

    if (total > 0) {
      let gst = (total * 14) / 100;
      setGST(gst.toFixed(2));
      total += gst;
    } else {
      setGST(0);
    }

    if (total > 0) {
      let dist = (total * invoice.discount) / 100;
      setDiscount(dist.toFixed(2));
      total -= dist;
    } else {
      setDiscount(0);
    }

    setTotal(total.toFixed(2));
    // updateSubTotal(subtotal);
  }, [invoice]);

  useEffect(() => {
    updateSubTotal(subtotal);
    updateTotal(total);
  }, [total, subtotal]);

  return (
    <div className="totalCard">
      <p>
        Subtotal : <span>{subtotal} rs.</span>
      </p>
      <p>
        GST (14%) : <span>{GST} rs.</span>
      </p>
      {invoice.discount > 0 && (
        <p>
          Discount ({invoice.discount}%) : <span>{discount} rs.</span>
        </p>
      )}
      <hr />
      <p>
        Total : <span>{total} rs.</span>
      </p>
    </div>
  );
};

export default TotalCard;
