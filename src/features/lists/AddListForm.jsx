import { useState } from "react";
import { useAddMyListMutation } from "./listSlice";

export default function AddListForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const [listIds, setListIds] = useState("");
  const [ownerId, setOwnerId] = useState(0);

  const [addList, { isLoading: isAdding, error: addingError }] =
    useAddMyListMutation();

  const postList = async (event) => {
    event.preventDefault();
    const listData = {
      name,
      description,
      ownerId,
      //listIds: [1],
    };

    console.log("Posting list data:", listData);
    try {
      const response = await addList(listData).unwrap();
      console.log("List added:", response);
    } catch (e) {
      console.error("Failed to add list:", e);
    }
  };

  return (
    <>
      <h2>Add a List</h2>
      <form onSubmit={postList}>
        <label>
          Name
          <input
            id="listName"
            name="listName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Add List</button>
        {isAdding && <output>Uploading list information...</output>}
        {addingError && <output>{addingError.message}</output>}
      </form>
    </>
  );
}
