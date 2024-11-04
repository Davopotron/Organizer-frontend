import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetMyListQuery } from "./myListsSlice";
import { useGetListItemsQuery } from "../listItems/listItemsSlice";
import {
  useUpdateListItemsMutation,
  useAddListItemsMutation,
  useDeleteListItemsMutation,
} from "../listItems/listItemsSlice";
import ListItems from "../listItems/ListItems";
import { useSelector } from "react-redux";
import AddListForm from "./AddMyListForm";
import AddListItemForm from "../listItems/AddListItemForm";

export default function ListDetails() {
  const { id } = useParams();
  const { data: myList, isLoading } = useGetMyListQuery(id);
  const { data: listItems, isLoadingListItem } = useGetListItemsQuery();
  const [deleteListItem] = useDeleteListItemsMutation();
  const [updateListItem] = useUpdateListItemsMutation(id);
  const [editMode, setEditMode] = useState("");
  const [newName, setNewName] = useState("");

  const listId = parseInt(id, 10);
  if (isLoading) return <p>Loading Item...</p>;

  const handleEdit = async (id, currentName) => {
    setEditMode(id);
    setNewName(currentName);
  };

  const handleUpdate = async (id) => {
    if (newName.trim()) {
      await updateListItem({ id, itemName: newName });
      setEditMode(null);
    }
  };

  const handleDelete = async (listItemId) => {
    if (window.confirm("Are you sure you want to delete this list item?")) {
      try {
        await deleteListItem(listItemId).unwrap();
      } catch (error) {
        console.error("failed to delete list item:", error);
      }
    }
  };

  return (
    <div className="list-details-container">
      <table className="list-details table">
        <tbody>
          <tr>
            <th>
              <h1 className="list-details-title">List Details</h1>
              <h2 className="list-details-name">{myList.name}</h2>
              <div className="add-form">
                <AddListItemForm myListId={listId} />
              </div>
              <ul className="list-items">
                {myList.listItems.map((listItem) => (
                  <li key={listItem.id}>
                    <h2 className="list-item-name">{listItem.itemName}</h2>
                    {editMode === listItem.id ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          value={newName || ""}
                          onChange={(e) => setNewName(e.target.value)}
                          className="edit-input"
                        />
                        <button
                          onClick={() => handleUpdate(listItem.id)}
                          className="update-button"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditMode(null)}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="button-group">
                        <button
                          onClick={() => handleEdit(listItem.id, listItem.name)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(listItem.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
