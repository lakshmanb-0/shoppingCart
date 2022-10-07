import React, { useState, useContext, useMemo } from "react";
import "./ProductItem.css";
import { contextApi } from "../Context/Context";

function ProductItem({ item, handleCross }) {
  const { state, dispatch } = useContext(contextApi);
  const [count, setcount] = useState(1);

  // update total price once only
  useMemo(() => {
    dispatch({ type: "subtotal", payload: item.price });
  }, []);

  return (
    <tbody>
      <tr>
        <td className="product_img_box">
          <i
            className="fa-solid fa-xmark"
            onClick={() => handleCross(item.id)}
          ></i>
          <img src={item.thumbnail} alt="" className="product_img" />
        </td>
        <td>{item.title}</td>
        <td>
          <span>${item.price}</span>
        </td>
        <td>
          <div className="count_box ">
            <i
              className={`fa-solid fa-minus ${count == 0 ? "disabled" : ""}`}
              onClick={() => {
                setcount((prev) => prev - 1);
                dispatch({ type: "removesubtotal", payload: item.price });
              }}
            ></i>
            <span>{count}</span>
            <i
              className="fa-solid fa-plus"
              onClick={() => {
                setcount((prev) => prev + 1);
                dispatch({ type: "subtotal", payload: item.price });
              }}
            ></i>
          </div>
        </td>
        <td>${item.price * count}</td>
      </tr>
    </tbody>
  );
}

export default ProductItem;
