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
// Function that renders a list of all lists
export default function GetList() {
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
  if (isLoading) {
    return <h2>Loading List...</h2>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!MyLists.length) {
    return <p>There are no lists.</p>;
  }
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
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th scope="col">
              <h1 className="myListsName"> My Lists</h1>
              <SearchBar names={MyLists} onSearch={handleFilteredResults} />
              <ul className="listItems">
                {listsToRender.length > 0 &&
                  listsToRender.map((m) => (
                    <li key={m.id} className="mainList">
                      <div className="listHeader">
                        <h2 className="listName">{m.name}</h2>
                        <div className="dropdownContainer">
                          <button
                            className="dotsButton"
                            onClick={() => dropdown(m.id)}
                          >
                            ⋮
                          </button>
                          {dropdownOpen === m.id && (
                            <div className="dropdownMenu">
                              <button onClick={() => handleSeeDetails(m.id)}>
                                See Details
                              </button>
                              <button
                                onClick={() =>
                                  handleEditClick(m.id, m.name, m.description)
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
                      </div>
                      <p>{m.description}</p>
                      {editMode === m.id && (
                        <>
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                          <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                          />
                          <button onClick={() => handleUpdate(m.id)}>
                            Save
                          </button>
                          <button onClick={() => setEditMode(null)}>
                            Cancel
                          </button>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </th>
          </tr>
        </tbody>
      </table>
      <div className="listForm">
        <AddListForm />
      </div>
    </>
  );
}
