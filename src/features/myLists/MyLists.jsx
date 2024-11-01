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
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th scope="col">
              <h1> My Lists</h1>
              <form>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>
              <ul>
                {MyLists.map((m) => (
                  <li key={m.id} className="mainList">
                    {editMode === m.id ? (
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
                    ) : (
                      <>
                        <h2>
                          <p>{m.name}</p>
                          <p>{m.description}</p>
                        </h2>
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
