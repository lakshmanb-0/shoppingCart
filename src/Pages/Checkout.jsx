import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "../Components/ProductItem";
import { contextApi } from "../Context/Context";
import "./Checkout.css";

function Checkout() {
  const { state, handleCross } = useContext(contextApi);
  const [subtotal, setsubtotal] = useState(null);

  // add all subtotal  by using reduce
  function stateSubtotal() {
    setsubtotal(
      state.subtotal.reduce(function (x, y) {
        return x + y;
      }, 0)
    );
  }

  // call when state changes
  useMemo(() => {
    stateSubtotal();
  }, [state]);
  return (
    <div className="checkout">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        {state.cartdata.map((item) => (
          <ProductItem item={item} handleCross={handleCross} key={item.id} />
        ))}
      </table>

      {/* cart  */}
      <div className="cart_details">
        <h2 className="cart_title">Cart totals</h2>
        <div className="cart_subtotal">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="cart_total">
          <span>Total</span>
          <span>${subtotal}</span>
        </div>
        <Link to="/thank">
          <button className={`cart_btn ${subtotal == 0 ? "disabled" : ""}`}>
            PROCEED TO CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
