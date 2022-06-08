import React from "react";
import { Link } from "react-router-dom";
function EmptyCart() {
  return (
    <div className="empty__container">
      <h2> Cart is empty</h2>
      <div className="description">
        <p>Please select a product and add to cart</p>
        <img className="cart__img" src="img/cart.png" alt="cart img" />
      </div>
      <Link to="/">
        <button> Back </button>
      </Link>
    </div>
  );
}

export default EmptyCart;
