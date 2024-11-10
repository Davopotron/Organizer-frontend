import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetShoppingItemsQuery } from "../../features/ShoppingCart/shopCartSlice";
import { selectToken } from "../auth/authSlice";
import "../../css/Shopping.css";

export default function ShopCart() {
  const { data: shopItems = [], isLoading, error } = useGetShoppingItemsQuery();

  if (isLoading) return <h2> Loading Items </h2>;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!shopItems.length) {
    return <p> There are no items. </p>;
  }

  return (
    <div className="shopping-container">
      <h1> Shopping Cart:</h1>
      <ul>
        {shopItems.map((shopItem) => (
          <li key={shopItem.name}>
            {shopItem.name} - ${shopItem.price}
          </li>
        ))}
      </ul>
      <h3>Total:</h3>
    </div>
  );
}
