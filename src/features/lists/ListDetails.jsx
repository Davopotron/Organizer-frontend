import { useSelector } from "react-redux";
import {
  useDeleteListMutation,
  useGetListQuery,
} from "./listSlice";
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import UpdateListForm from "./UpdateListForm";
import "./listDetails.css";

export default function ListDetails(/*{
  selectedListId,
  setSelectedListId,
}*/) {
  const { id: selectedListId } = useParams();
  const { data: list, isLoading } =
    useGetListQuery(selectedListId);

  const [deleteList] = useDeleteListMutation();
  const token = useSelector((state) => state.auth.token);
  const [deleted, setDeleted] = useState(false);

  const removeList = async (id) => {
    if (!token) {
      console.error("No token found");
      return;
    }
    if (!list) {
      console.log("No list found");
      return;
    }
    //setSelectedListId();
    try {
      await deleteList(id).unwrap();
      setDeleted(true);
    } catch (e) {
      console.error("Failed to delete list:", e);
    }
  };

  if (deleted) {
    return <Navigate to="/lists" />;
  }

  let $details;

  if (!selectedListId) {
    $details = <p>Select a list to see more details.</p>;
  } else if (isLoading) {
    $details = <p>Loading list information...</p>;
  } else {
    $details = (
      <>
        <div className="listDetailsGroup">
          <div className="listDetails">
            <h3>
              {list.name} #{list.id}
            </h3>
            <button onClick={() => removeList(list.id)}>
              Delete List
            </button>
          </div>
          <div className="listUpdateForm">
            <UpdateListForm list={list} />
          </div>
        </div>
      </>
    );
  }

  return (
    <main>
      <h2>List Details</h2>
      {$details}
    </main>
  );
}