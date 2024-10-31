import { useState } from "react";
import ListDetails from "../lists/ListDetails";
import { useUpdateListItemsMutation } from "./listItemsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "..auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateListItemForm({ listItem }) {
  const [item, setItem] = useState(listItem.item);
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("https://loremflickr.com/200/300/dog");
  const [updateListItem, { isLoading: isUpdating, error: updatingError }] =
    useUpdateListItemMutation();

  const putListItem = async (event) => {
    event.preventDefault();
    const updatedListItemData = {
      item
    };

    console.log("Updating item:", updatedListItemData);

    try {
      const response = await updateListItem({
        id: myListId,
        item: updatedListItemData,
      }).unwrap();
      console.log("item updated:", response);
    } catch (e) {
      console.error("Failed to update item", e);
    }
  };

  return (
    <>
      <h2>Update Item</h2>
      <form onSubmit={putItem}>
        <label>
          Name
          <input
            name="itemName"
            value={name}
            onChange={(e) => setItem(e.target.value)}
          />
        </label>
        {/* <label>
          Description
          <input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Image
          <input
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Item Id
          <input name="myListId" onChange={(e) => setId(e.target.value)} />
        </label>
        <button type="submit">Update Department</button>
        {isUpdating && <output>Uploading department information...</output>}
        {updatingError && <output>{updatingError.message}</output>} */}
      </form>
    </>
  );
}