import { useState } from "react";
import { useAddMyListMutation } from "./myListsSlice";
import "../../css/AddMyList.css";

export default function AddListForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const [listIds, setListIds] = useState("");
  const [ownerId, setOwnerId] = useState(1);

  const [addList, { isLoading: isAdding, error: addingError }] =
    useAddMyListMutation();

  const postList = async (event) => {
    event.preventDefault();
    const listData = {
      name,
      description,
      ownerId,
      listIds: [],
    };

    console.log("Posting list data:", listData);
    try {
      const response = await addList(listData).unwrap();
      console.log("List added:", response);
      setName("");
      setDescription("");
    } catch (e) {
      console.error("Failed to add list:", e);
    }
  };

  return (
    <>
      <h2>Add a List</h2>
      <form onSubmit={postList}>
        <div className="nameContainer">
          <label className="name">
            Name
            <input
              id="listName"
              name="listName"
              value={name}
              className="listNameText"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="descriptionContainer">
          <label className="description">
            Description
            <input
              id="description"
              name="description"
              value={description}
              className="listDescriptionText"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button className="AddListButton" type="submit">
          Add List
        </button>
        {isAdding && <output>Uploading list information...</output>}
        {addingError && <output>{addingError.message}</output>}
      </form>
    </>
  );
}
