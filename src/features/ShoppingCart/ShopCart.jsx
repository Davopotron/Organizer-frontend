import React, { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [items, setItems] = useState([]); // Store fetched items
  const [selectedItems, setSelectedItems] = useState([]); // Store selected item IDs
  const [total, setTotal] = useState(0); // Store cart total

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/shopping/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Handle checkbox changes
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        // Deselect item
        return prevSelected.filter((id) => id !== itemId);
      } else {
        // Select item
        return [...prevSelected, itemId];
      }
    });
  };

  // Calculate total when selectedItems changes
  useEffect(() => {
    const calculateTotal = async () => {
      try {
        const response = await fetch("http://localhost:3000/shopping/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ selectedItems }),
        });
        const data = await response.json();
        setTotal(data.total);
      } catch (error) {
        console.error("Error calculating total:", error);
      }
    };
    calculateTotal();
  }, [selectedItems]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.name} - ${item.price.toFixed(2)}
            </label>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default ShoppingCart;
