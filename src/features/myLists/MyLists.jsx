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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        await deleteMyList(id).unwrap();
      } catch (error) {
        console.error("Failed to delete list: ", error);
      }
    }
  };

  const handleEditClick = (id, currentName, currentDescription) => {
    setEditMode(id);
    setNewName(currentName);
    setNewDescription(currentDescription);
    setDropDownOpen(null);
  };

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
  };

  const handleSeeDetails = (id) => {
    setSelectedMyListId(id);
    navigate(`/MyList/${id}`);
    setDropDownOpen(null);
  };

  const handleFilteredResults = (results) => {
    setFilteredResults(results);
  };

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
      <body className="myListBody">
      <table className="trim">
        <tbody>
          <tr>
            <th scope="col" className={`${className} listContainer`}>
              <h1 className="myListsName">My Lists</h1>
              <SearchBar names={MyLists} onSearch={handleFilteredResults} />
              <ul className="listItems">
                {listsToRender.length > 0 &&
                  listsToRender.map((m) => {
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
                            {editMode === m.id ? (
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="editField"
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
                            {dropdownOpen === m.id && (
                              <div className="dropdownMenu">
                                {isNearMe ? (
                                  <ul className="dropdownItems">
                                    {listItemsForThisList.length > 0 ? (
                                      listItemsForThisList.map((item) => (
                                        <li
                                          key={item.id}
                                          className="dropdownItem"
                                          onClick={() =>
                                            onListClick(item.itemName)
                                          }
                                        >
                                          {item.itemName}
                                        </li>
                                      ))
                                    ) : (
                                      <li>No ingredients</li>
                                    )}
                                  </ul>
                                ) : (
                                  <div className="dropdownItems">
                                    <button
                                      onClick={() => handleSeeDetails(m.id)}
                                    >
                                      See Details
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleEditClick(
                                          m.id,
                                          m.name,
                                          m.description
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button onClick={() => handleDelete(m.id)}>
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="listDescription">
                          {showDescription && (
                            <>
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
      </body>
    );
  }

  return (
    <>
      <div className="listForm">{showAddForm && <AddListForm />}</div>
      {content}
    </>
  );
}
