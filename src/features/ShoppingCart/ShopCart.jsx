import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetShoppingItemsQuery } from "../../features/ShoppingCart/shopCartSlice";
import { selectToken } from "../auth/authSlice";
import { useGetListItemsIdQuery } from "../listItems/listItemsSlice"; // To fetch list items
import "../../css/Shopping.css";

export default function ShopCart({ selectedList }) {
  // Fetch the items from the shopping API
  const {
    data: shopItems = [],
    isLoading: shopLoading,
    error: shopError,
  } = useGetShoppingItemsQuery();

  // Fetch the items in the selected list
  const {
    data: selectedListItems = { listItems: [] },
    isLoading: listLoading,
    error: listError,
  } = useGetListItemsIdQuery(selectedList?.id);

  if (shopLoading || listLoading) return <h2>Loading Items...</h2>;

  if (shopError || listError) {
    return <p>Error: {shopError?.message || listError?.message}</p>;
  }

  if (!selectedListItems.listItems.length) {
    return <p>There are no items in the selected list.</p>;
  }

  // Compare the selected list items with the shopping items
  const renderedItems = selectedListItems.listItems.map((listItem) => {
    const shopItem = shopItems.find(
      (shopItem) =>
        shopItem.name.toLowerCase() === listItem.itemName.toLowerCase()
    );

    if (shopItem) {
      return (
        <li key={listItem.id} className="shopping-item">
          {listItem.itemName} - ${shopItem.price}{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>✔</span>
        </li>
      );
    }

    return (
      <li key={listItem.id} className="shopping-item">
        {listItem.itemName}{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>✘</span>
      </li>
    );
  });

  return (
    <div className="shopping-container">
      <h1>Shopping Cart:</h1>
      <ul>{renderedItems}</ul>
    </div>
  );
}
