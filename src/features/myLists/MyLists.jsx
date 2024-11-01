import { useState } from "react";
// import ListDetails from "./MyListDetails";
import {
  useDeleteMyListMutation,
  useGetMyListsQuery,
  useUpdateMyListMutation,
} from "./myListsSlice";
// import { useGetMyListQuery } from "./myListsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import AddListForm from "./AddMyListForm";
import "../../css/MyLists.css";
//import AddListForm from "./AddListForm";

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
  {
    /* Added newDescription line 24*/
  }
  const [updateMyList] = useUpdateMyListMutation();
  const [dropdownOpen, setDropdownOpen] = useState(null);

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

  {
    /*added currentDescription in line below and on line 58*/
  }
  const handleEditClick = (id, currentName, currentDescription) => {
    setEditMode(id);
    setNewName(currentName);
    setNewDescription(currentDescription);
    setDropdownOpen(null);
  };

  const handleUpdate = async (id) => {
    if (newName.trim()) {
      await updateMyList({ id, name: newName });
      //setNewName("");
    }
    if (newDescription.trim()) {
      await updateMyList({ id, description: newDescription });
      //setNewDescription("");
    }
    setEditMode(null);
    setNewName("");
    setNewDescription("");
  };

  const handleSeeDetails = (id) => {
    setSelectedMyListId(id);
    navigate(`/MyList/${id}`);
    setDropdownOpen(null);
  };

  const dropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th scope="col">
              <h1> My Lists</h1>
              <ul className="listItems">
                {MyLists.map((m) => (
                  <li key={m.id} className="mainList">
                    <div className="listHeader">
                      <h2>{m.name}</h2>
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
                        <button onClick={() => handleUpdate(m.id)}>Save</button>
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
