import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMyListQuery } from "../../slices/myListsSlice";
import {
  useUpdateListItemsMutation,
  useDeleteListItemsMutation,
} from "../../slices/listItemsSlice";
import AddListItemForm from "../listItems/AddListItemForm";
import "../../css/myListDetails.css";

export default function ListDetails() {
  const { id } = useParams();
  const { data: myList, isLoading } = useGetMyListQuery(id);

  const [editMode, setEditMode] = useState("");
  const [newName, setNewName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open

  const [deleteListItem] = useDeleteListItemsMutation();
  const [updateListItem] = useUpdateListItemsMutation(id);

  const listId = parseInt(id, 10);
  if (isLoading) return <p>Loading Item...</p>;

  const handleEdit = (id, currentName) => {
    setEditMode(id);
    setNewName(currentName);
    setShowDropdown(null); // Close dropdown if in edit mode
  };

  const handleUpdate = async (id) => {
    if (newName.trim()) {
      try {
        await updateListItem({ id, itemName: newName });
        setEditMode(null); // Exit edit mode after updating
        setNewName(""); // Clear the input field
      } catch (error) {
        console.error("Failed to update list item:", error);
      }
    }
  };

  const handleDelete = async (listItemId) => {
    if (window.confirm("Are you sure you want to delete this list item?")) {
      try {
        await deleteListItem(listItemId).unwrap();
        setShowDropdown(null); // Close dropdown after deletion
      } catch (error) {
        console.error("failed to delete list item:", error);
      }
    }
  };

  return (
    <div className="list-details-container">
      <table>
        <tbody>
          <tr>
            <th>
              <h1 className="list-details-name">{myList.name}</h1>
              <button
                onClick={() => setShowAddForm(true)}
                className="open-add-form-button"
              >
                Add List Item
              </button>
              {showAddForm && (
                <div>
                  <div className="add-form-container">
                    <button
                      className="close-add-form-button"
                      onClick={() => setShowAddForm(false)}
                    >
                      Close
                    </button>
                    <AddListItemForm myListId={listId} />
                  </div>
                </div>
              )}
              <ul className="list-items">
                {myList.listItems.map((listItem) => (
                  <li key={listItem.id} className="list-item">
                    {editMode === listItem.id ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          value={newName || ""}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdate(listItem.id)}
                          className="editbuttons"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMode(null)}
                          className="editbuttons"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="list-item-content">
                        <h2 className="list-item-name">{listItem.itemName}</h2>
                        <div className="dropdownContainer">
                          <button
                            className="dropdown-toggle"
                            onClick={() =>
                              setShowDropdown(
                                showDropdown === listItem.id
                                  ? null
                                  : listItem.id
                              )
                            }
                          >
                            ⋮
                          </button>
                          {showDropdown === listItem.id && (
                            <div className="dropdownMenu">
                              <button
                                onClick={() =>
                                  handleEdit(listItem.id, listItem.itemName)
                                }
                                className="dropdown-item"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(listItem.id)}
                                className="dropdown-item"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
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
