import { useState } from "react";
import { useAddMyListMutation } from "../../slices/myListsSlice";
import "../../css/addMyListForm.css";
import toastr from "toastr";
export default function AddListForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

    try {
      const response = await addList(listData).unwrap();
      setName("");
      setDescription("");
      toastr.success("List added.");
    } catch (e) {
      console.error("Failed to add list:", e);
    }
  };

  return (
    <>
      <h2 className="addAList">Add a List</h2>
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
              aria-label="list-name-input"
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
              aria-label="description-input"
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
