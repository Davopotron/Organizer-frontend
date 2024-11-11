import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetShoppingItemsQuery,
  useAddToCartMutation,
} from "../../features/ShoppingCart/shopCartSlice";
import { selectToken } from "../auth/authSlice";
import { useGetListItemsIdQuery } from "../listItems/listItemsSlice"; // To fetch list items
import "../../css/Shopping.css";

// export default function ShopCart({ selectedList }) {
//   // Fetch the items from the shopping API
//   const {
//     data: shopItems = [],
//     isLoading: shopLoading,
//     error: shopError,
//   } = useGetShoppingItemsQuery();

//   // Fetch the items in the selected list
//   const {
//     data: selectedListItems = { listItems: [] },
//     isLoading: listLoading,
//     error: listError,
//   } = useGetListItemsIdQuery(selectedList?.id);

//   // State to track selected items
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Set the default selected items to all in-stock items on mount
//   useEffect(() => {
//     if (shopItems.length) {
//       const defaultSelected = shopItems
//         .filter((item) => item.inStock)
//         .map((item) => item.id);
//       setSelectedItems(defaultSelected);
//     }
//   }, [shopItems]);

//   // Calculate the total price based on selected items
//   useEffect(() => {
//     const calculateTotal = () => {
//       const selectedPrices = shopItems
//         .filter((item) => selectedItems.includes(item.id))
//         .reduce((acc, item) => acc + item.price, 0);
//       setTotal(selectedPrices);
//     };
//     calculateTotal();
//   }, [selectedItems, shopItems]);

//   // Toggle selection of an item
//   const toggleSelection = (itemId) => {
//     setSelectedItems(
//       (prevSelected) =>
//         prevSelected.includes(itemId)
//           ? prevSelected.filter((id) => id !== itemId) // Deselect if already selected
//           : [...prevSelected, itemId] // Add to selection
//     );
//   };

//   if (shopLoading || listLoading) return <h2>Loading Items...</h2>;

//   if (shopError || listError) {
//     return <p>Error: {shopError?.message || listError?.message}</p>;
//   }

//   if (!selectedListItems.listItems.length) {
//     return <p>There are no items in the selected list.</p>;
//   }

//   // Compare the selected list items with the shopping items
//   const renderedItems = selectedListItems.listItems.map((listItem) => {
//     const shopItem = shopItems.find(
//       (shopItem) =>
//         shopItem.name.toLowerCase() === listItem.itemName.toLowerCase()
//     );

//     if (shopItem) {
//       const isSelected = selectedItems.includes(shopItem.id);

//       return (
//         <li
//           key={listItem.id}
//           className="shopping-item"
//           onClick={() => toggleSelection(shopItem.id)} // Toggle selection on click
//           style={{
//             cursor: "pointer",
//             backgroundColor: isSelected ? "#d4edda" : "#f8d7da", // Green if selected, red if not
//           }}
//         >
//           {listItem.itemName} - ${shopItem.price}{" "}
//           <span
//             style={{
//               color: shopItem.inStock ? "green" : "red",
//               fontWeight: "bold",
//             }}
//           >
//             {shopItem.inStock ? "✔" : "✘"}
//           </span>
//         </li>
//       );
//     }

//     return (
//       <li key={listItem.id} className="shopping-item">
//         {listItem.itemName}{" "}
//         <span style={{ color: "red", fontWeight: "bold" }}>✘</span>
//       </li>
//     );
//   });

//   return (
//     <div className="shopping-container">
//       <h1>Shopping Cart:</h1>
//       <ul>{renderedItems}</ul>
//       <h3>Total: ${total.toFixed(2)}</h3>
//     </div>
//   );
// }

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

  // State to track selected items
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Set the default selected items to all in-stock items on mount
  useEffect(() => {
    if (shopItems.length) {
      const defaultSelected = shopItems
        .filter((item) => item.inStock)
        .map((item) => item.id);
      setSelectedItems(defaultSelected);
    }
  }, [shopItems]);

  // Calculate the total price based on selected items
  useEffect(() => {
    const calculateTotal = () => {
      const selectedPrices = shopItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price, 0);
      setTotal(selectedPrices);
    };
    calculateTotal();
  }, [selectedItems, shopItems]);

  // Toggle selection of an item
  const toggleSelection = (itemId) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(itemId)
          ? prevSelected.filter((id) => id !== itemId) // Deselect if already selected
          : [...prevSelected, itemId] // Add to selection
    );
  };

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
      const isSelected = selectedItems.includes(shopItem.id);

      return (
        <li key={listItem.id} className="shopping-item">
          <div className="item-content">
            {listItem.itemName} - ${shopItem.price}{" "}
            <span
              className="status"
              style={{
                color: shopItem.inStock ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {shopItem.inStock ? "✔" : "✘"}
            </span>
          </div>
          {shopItem.inStock && (
            <button
              className="toggle-selection"
              onClick={() => toggleSelection(shopItem.id)}
              aria-label={isSelected ? "Deselect item" : "Select item"}
            >
              {isSelected ? "➖" : "➕"}
            </button>
          )}
        </li>
      );
    }

    return (
      <li key={listItem.id} className="shopping-item">
        <div className="item-content">
          {listItem.itemName}{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>✘</span>
        </div>
      </li>
    );
  });

  return (
    <div className="shopping-container">
      <h1>Shopping Cart:</h1>
      <ul>{renderedItems}</ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
