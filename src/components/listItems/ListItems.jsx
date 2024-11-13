import { useGetListItemsQuery } from "../../slices/listItemsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../../slices/authSlice";

//Function that renders a singular list's items

export default function RenderItems() {
  const { data: listItems = [], isLoading, error } = useGetListItemsQuery();
  const token = useSelector(selectToken);

  if (isLoading) return <h2>Loading Item</h2>;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!listItems.length) {
    return <p>There are no items.</p>;
  }

  return (
    <>
      <h1>List Items</h1>
      <ul>
        <li>
          <h2>{listItems.name}</h2>
          <p>
            <b>Items: </b>
            {listItems.length}
          </p>
          <div>
            <button onClick={() => handleEdit()}>Edit List</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
          <div>
            {listItems.map((listItem) => (
              <p key={listItem.id}>{listItem.item}</p>
            ))}
          </div>
        </li>
      </ul>
    </>
  );
}
