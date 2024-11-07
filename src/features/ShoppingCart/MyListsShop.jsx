import React, { useState } from "react";
import { useGetMyListsQuery } from "../../features/myLists/myListsSlice";
import { useGetListItemsQuery } from "../listItems/listItemsSlice";
import { useDeleteListItemsMutation } from "../listItems/listItemsSlice";
import SearchBar from "../../features/myLists/Searchbar";
import "../../css/Shopping.css";
import ShopCart from "./ShopCart";

export default function MyListsShop() {
  const { data: MyLists = [], isLoading, error } = useGetMyListsQuery();
  const [selectedList, setSelectedList] = useState(null);
  const [showListDetails, setShowListDetails] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [deleteListItem] = useDeleteListItemsMutation();

  // Fetch list items for the selected list
  const { data: selectedListItems = [] } = useGetListItemsQuery(
    selectedList?.id
  );

  if (isLoading) return <h2>Loading List...</h2>;
  if (error) return <p>{error.message}</p>;
  if (!MyLists.length) return <p>There are no lists.</p>;

  // Select a list and show details
  const handleListSelection = (list) => {
    setSelectedList(list);
    setShowListDetails(true);
    setSelectedItems({});
  };

  // Go back to the main list view
  const handleBackToList = () => {
    setShowListDetails(false);
    setSelectedList(null);
  };

  // Toggle item selection and update items
  const handleItemSelection = (itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  // Handle delete item
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteListItem(itemId);
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="listContainer">
      {showListDetails ? (
        <div>
          <h1 className="list-details-name">{selectedList.name}</h1>
          <button onClick={handleBackToList}>Back to All Lists</button>
          <ul className="listItems">
            {selectedListItems.length > 0 ? (
              selectedListItems.map((item) => (
                <li key={item.id} className="item">
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.id]}
                    onChange={() => handleItemSelection(item.id)}
                  />
                  {item.itemName} - ${item.price?.toFixed(2) || "0.00"}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    X
                  </button>
                </li>
              ))
            ) : (
              <p>No items in this list.</p>
            )}
          </ul>
          <ShopCart items={selectedListItems} selectedItems={selectedItems} />
        </div>
      ) : (
        <div>
          <h1 className="myListsTitle">My Lists</h1>
          <SearchBar names={MyLists} />
          <ul className="lists">
            {MyLists.map((list) => (
              <li key={list.id} className="listItem">
                <div
                  className="listHeader"
                  onClick={() => handleListSelection(list)}
                >
                  {list.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
