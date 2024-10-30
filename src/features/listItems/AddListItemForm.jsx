import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddMyListItemMutation } from "./listItemsSlice";

export default function AddListItemForm() {
  const [listItemData, setListItemData] = useState({
    item: "",
    myListId: 0,
  });

  const navigate = useNavigate();
  const [addListItem] = useAddMyListItemMutation();

  const postListItem = async (event) => {
    event.preventDefault();
    try {
      const listItem = await addListItem({
        ...listItemData,
      }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={postListItem}>
      <div className="addListItem">
        <label>
          Item
          <input
            name="item"
            value={listItemData.item}
            onChange={(e) =>
              setListItemData({ ...listItemData, item: e.target.value })
            }
          />
        </label>
        <label>
          ListId
          <input
            type="number"
            name="myListId"
            value={listItemData.myListId}
            onChange={(e) =>
              setListItemData({ ...listItemData, myListId: e.target.value })
            }
          />
        </label>
      </div>
      <button>+</button>
    </form>
  );
}
