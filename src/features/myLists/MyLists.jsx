import React, { useState } from "react";
import {
  useDeleteMyListMutation,
  useGetMyListsQuery,
  useUpdateMyListMutation,
} from "./myListsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import AddListForm from "./AddMyListForm";
import SearchBar from "./Searchbar";
import "../../css/MyLists.css";
import { useGetListItemsQuery } from "../listItems/listItemsSlice";
import toastr from "toastr";
import Dropdown from "./DropDownMenu";

// Function that renders a list of all lists
export default function GetList({
  className = "",
  showAddForm = true,
  showDescription = true,
  isNearMe = false,
  onListClick,
}) {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const { data: MyLists = [], isLoading, error } = useGetMyListsQuery();
  const [selectedMyListId, setSelectedMyListId] = useState(null);
  const [deleteMyList] = useDeleteMyListMutation();
  const [editMode, setEditMode] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [updateMyList] = useUpdateMyListMutation();
  const [dropdownOpen, setDropDownOpen] = useState(null);
  const { data: listItemsData, isLoading: listItemsLoading } =
    useGetListItemsQuery();

  /**
   *
   * @param {number} id - ID of list to be deleted
   */

  const handleDelete = async (id) => {
    //Toastr confirmation button for deleting
    toastr.info(
      `Are you sure you want to delete this list? <button id="delete-list-button" class id=delete-list-button>Confirm</button>`
    );

    //Get element with id
    const confirmButton = document.getElementById("delete-list-button");
    if (confirmButton) {
      //When clicked, proceed to delete
      confirmButton.onclick = async () => {
        try {
          await deleteMyList(id).unwrap();
          //Toastr message to confirm deleted
          toastr.success("Deleted list");
          //Catch errors
        } catch (error) {
          console.error("Failed to delete list: ", error);
        }
        //Clear toastr messages once action is done
        toastr.clear();
      };
    }
  };

  /**
   *
   * @param {number} id
   * @param {string} currentName
   * @param {*} currentDescription
   */
  const handleEditClick = (id, currentName, currentDescription) => {
    setEditMode(id);
    setNewName(currentName);
    setNewDescription(currentDescription);
    setDropDownOpen(null);
  };

  /** Update newName and/or description */
  const handleUpdate = async (id) => {
    if (newName.trim()) {
      await updateMyList({ id, name: newName });
      setEditMode(null);
      setNewName("");
    }
    if (newDescription.trim()) {
      await updateMyList({ id, description: newDescription });
      setEditMode(null);
      setNewDescription("");
    }
    toastr.success("List updated.");
  };

  /** Navigate to details of specific list */
  const handleSeeDetails = (id) => {
    setSelectedMyListId(id);
    navigate(`/MyList/${id}`);
    setDropDownOpen(null);
  };

  /** Filter results to what is typed */
  const handleFilteredResults = (results) => {
    setFilteredResults(results);
  };

  /** Create dropdown */
  const dropdown = (id) => {
    setDropDownOpen(dropdownOpen === id ? null : id);
  };

  const listsToRender = filteredResults.length > 0 ? filteredResults : MyLists;

  // Render the content conditionally
  //added classname=trim to <table>
  let content;

  if (isLoading) {
    content = <h2>Loading List...</h2>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else if (MyLists.length === 0) {
    content = <p>There are no lists.</p>;
  } else {
    content = (
      <div className="myListBody">
      <table className="trim">
        <tbody>
          <tr>
            <th scope="col" className={`${className} listContainer`}>
              <h1 className="myListsName">My Lists</h1>
              {/* Add SearchBar component and pass in MyLists and handleFilteredResults as props*/}
              <SearchBar names={MyLists} onSearch={handleFilteredResults} />
              <ul className="listItems">
                {listsToRender.length > 0 &&
                  listsToRender.map((m) => {
                    // Get list items associated with list
                    const listItemsForThisList = listItemsData?.filter(
                      (item) => String(item.myListId) === String(m.id)
                    );
                    return (
                      <li key={m.id} className="mainList">
                        <div className="listHeader">
                          <h2
                            className="listName"
                            onClick={() => onListClick(m.name)}
                          >
                            {/* If in edit mode, show input to edit list name */}
                            {editMode === m.id ? (
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="editField"
                                aria-label="edit-mode-input"
                              />
                            ) : (
                              m.name
                            )}
                          </h2>
                          <div className="dropdownContainer">
                            <button
                              className="dotsButton"
                              onClick={() => dropdown(m.id)}
                            >
                              ⋮
                            </button>
                            {/* Add Dropdown component and pass in props*/}
                            {dropdownOpen === m.id && (
                              <Dropdown
                                isNearMe={isNearMe}
                                listItemsForThisList={listItemsForThisList}
                                onListClick={onListClick}
                                handleSeeDetails={handleSeeDetails}
                                handleEditClick={handleEditClick}
                                handleDelete={handleDelete}
                                m={m}
                              />
                            )}
                          </div>
                        </div>
                        <p className="listDescription">
                          {showDescription && (
                            <>
                              {/* If in edit mode, show input to edit description */}
                              {editMode === m.id ? (
                                <textarea
                                  value={newDescription}
                                  onChange={(e) =>
                                    setNewDescription(e.target.value)
                                  }
                                  className="editField"
                                />
                              ) : (
                                m.description
                              )}
                            </>
                          )}
                        </p>
                        {/* In edit mode, can save new input or cancel. */}
                        {editMode === m.id && (
                          <div className="buttonContainer">
                            <button
                              className="SaveButton"
                              onClick={() => handleUpdate(m.id)}
                            >
                              Save
                            </button>
                            <button
                              className="CancelButton"
                              onClick={() => setEditMode(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </th>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }

  return (
    <>
      {/* Render the Add List Form component*/}
      <div className="listForm">{showAddForm && <AddListForm />}</div>
      {content}
    </>
  );
}
