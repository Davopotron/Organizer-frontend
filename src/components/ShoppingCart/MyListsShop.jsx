import React, { useState } from "react";
import {
  useGetListItemsIdQuery,
  useDeleteListItemsMutation,
} from "../../slices/listItemsSlice";
import { useGetMyListsQuery } from "../../slices/myListsSlice";
import { useAddToCartMutation } from "../../slices/shopCartSlice";
import SearchBar from "../myLists/Searchbar";
import ShopCart from "./ShopCart";
import "../../css/shopping.css";

export default function MyListsShop({ className, id }) {
  const { data: MyLists = [], isLoading, error } = useGetMyListsQuery(); // Fetch all lists
  const [selectedList, setSelectedList] = useState(null);
  const [showListDetails, setShowListDetails] = useState(false);
  const { data: selectedListItems = { listItems: [] } } =
    useGetListItemsIdQuery(selectedList?.id); // Fetch items for the selected list
  const [deleteListItem] = useDeleteListItemsMutation(); // Mutation to delete list items
  const [filteredLists, setFilteredLists] = useState([]);

  // Go back to the main list view
  const handleBackToList = () => {
    setShowListDetails(false);
    setSelectedList(null);
  };

  // Select a list and show its details
  const handleListSelection = (list) => {
    setSelectedList(list);
    setShowListDetails(true);
  };

  // Handle deleting an item
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteListItem(itemId);
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleSearch = (results) => {
    setFilteredLists(results.length > 0 ? results : MyLists);
  };

  const listsToDisplay = filteredLists.length > 0 ? filteredLists : MyLists;

  if (isLoading) return <h2>Loading List...</h2>;
  if (error) return <p>Error: {error.message}</p>;
  if (!MyLists || MyLists.length === 0) return <p>There are no lists.</p>;

  return (
    <div className={className}>
      {showListDetails ? (
        <div>
          <h1 className="list-details-name">{selectedList.name}</h1>
          <button className="backbutton" onClick={handleBackToList}>
            Back to All Lists
          </button>
          <ul className="listItems">
            {selectedListItems?.listItems?.length > 0 ? (
              selectedListItems.listItems.map((item) => (
                <li key={item.id} className="item">
                  {item.itemName}
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
          <ShopCart selectedList={selectedList} />
        </div>
      ) : (
        <div>
          <h1 className="myListsTitle">My Lists</h1>
          <SearchBar names={MyLists} onSearch={handleSearch} />
          <ul className="lists">
            {listsToDisplay.map((list) => (
              <li
                key={list.id}
                className="listItem"
                onClick={() => handleListSelection(list)}
              >
                <div className="listHeader">{list.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
