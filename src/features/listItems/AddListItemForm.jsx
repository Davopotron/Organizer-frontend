import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddListItemsMutation } from "./listItemsSlice";

export default function AddListItemForm({ myListId }) {
  //   const [listItemData, setListItemData] = useState(""); -comment
  const [itemName, setItemName] = useState("");
  // const [myListId, setMyListId] = useState();

  //const navigate = useNavigate(); -comment
  const [addListItem, { isLoading: isAdding, error: addingError }] =
    useAddListItemsMutation();

  //   const postListItem = async (event) => { -comment
  //     event.preventDefault(); -comment
  //     try { -comment
  //       /*const listItem = */ await addListItem({ -comment
  //         ...listItemData, -comment
  //       }).unwrap(); -comment
  //     } catch (e) { -comment
  //       console.error(e); -comment
  //     }
  //   };

  const postList = async (event) => {
    event.preventDefault();

    // if (!myListId) {
    //     console.error("myListId is undefined");
    //     return;
    // }
    const listData = {
      itemName,
      myListId,
    };
    console.log("Posting list data:", listData);
    try {
      const response = await addListItem(listData).unwrap();
      console.log("List added:", response);
    } catch (e) {
      console.error("Failed to add list:", e);
    }
  };

  return (
    <>
      <h2>Add a List Item</h2>
      <form onSubmit={postList}>
        <div className="addListItem">
          <label>
            Item Name
            {/* <input   -comment 
            name="itemName"   -comment
            value={listItemData.item}  -comment
            onChange={(e) => -comment
              setListItemData({ ...listItemData, item: e.target.value }) -comment
            } */}
            <input
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </label>
          {/* <label> 
          ListId 
          <input 
            name="myListId"  
            value={myListId}  
            onChange={(e) => 
              setMyListId({ ...listItemData, myListId: e.target.value })  
            } 
          />
        </label> */}
        </div>
        <button type="submit">Confirm Save</button>
        {isAdding && <output>Uploading list item</output>}
        {addingError && <output>{addingError.message}</output>}
      </form>
    </>
  );
}

// listItemData. <---this was in the ListId label in the value={} next to myListId
