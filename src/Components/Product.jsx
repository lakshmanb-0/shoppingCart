import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { contextApi } from "../Context/Context";

function Product({ product }) {
  const { dispatch } = useContext(contextApi);
  const [Cartdata, setCartData] = useState([]);

  // get only gata if checked is checked
  const handleClick = (e) => {
    product.map((item) => {
      if (!e.target.checked && e.target.id == item.id) {
        Cartdata.splice(Cartdata.indexOf(item), 1);
      } else if (e.target.checked && e.target.id == item.id) {
        setCartData((prev) => [...prev, item]);
      }
    });
  };

  // update cartdata wheen page render
  useEffect(() => {
    dispatch({ type: "adddata", payload: Cartdata });
  }, [Cartdata]);

  return (
    <div className="Product">
      <table>
        <thead>
          <tr className="product_header">
            <th>Image</th>
            <th>Name</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        {product.map((item) => (
          <tbody key={item.id}>
            <tr>
              <td>
                <img src={item.thumbnail} alt="" className="product_img" />
              </td>
              <td>
                <span>{item.title}</span>
              </td>
              <td>
                <span>{item.Color}</span>
              </td>
              <td>
                <span className="item_stock">
                  {item.stock ? (
                    <div className="green">
                      <i className="fa-solid fa-face-smile"></i> In Stock
                    </div>
                  ) : (
                    <div className="red">
                      <i className="fa-solid fa-face-frown"></i> Not Stock
                    </div>
                  )}
                </span>
              </td>
              <td>
                <span>${item.price}</span>
              </td>
              <td>
                <div className="item_cart">
                  <button className="item_count">1</button>
                  <button className="item_cart_i">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  <input
                    type="checkbox"
                    name="check"
                    id={item.id}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Product;
