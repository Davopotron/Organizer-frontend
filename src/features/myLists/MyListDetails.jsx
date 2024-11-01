import React, { useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {useGetMyListQuery} from './myListsSlice';
import { useGetListItemsQuery } from '../listItems/listItemsSlice';
import { useUpdateListItemsMutation, useAddListItemsMutation, useDeleteListItemsMutation } from '../listItems/listItemsSlice';
import ListItems from '../listItems/ListItems';
import {useSelector} from 'react-redux';
import AddListForm from './AddMyListForm';
// import {useGetProfessorQuery} from '../../store/facultySlice';

// export default function Professor() {
export default function ListDetails() {
  const {id} = useParams();
  const {data: myList, isLoading} = useGetMyListQuery(id);
  const {data: listItems, isLoadingListItem} = useGetListItemsQuery()
  const [deleteListItem] = useDeleteListItemsMutation();
  const [updateListItem] = useUpdateListItemsMutation(id);
  const [editMode, setEditMode] = useState('');
  const [newName, setNewName] = useState("");
  // const token = useSelector(selectToken);
  // const navigate = useNavigate();

  //console.log(list);
  if (isLoading) return <p>Loading Item...</p>;

  const handleEdit = async (id, currentName) => {
    setEditMode(id);
    setNewName(currentName);
    
  //   console.log('Edit clicked');
    // const newName = ('Enter new list details:', myList.itemName);
    // const newDetail = ('Enter new detail:', myList.detail);
    // if (newName !== null && newDetail !== null) {
    //   // myList.itemName = newName;
    //   myList.detail = newDetail;
    // }
  };

  const handleUpdate = async (id) => {
    if (newName.trim()) {
      await updateListItem({ id, itemName: newName });
      setEditMode(null);
      // setListItemId("");
    };
  };

  const handleDelete = async (listItemId) => {
  //   console.log('Delete clicked');
  //   console.log(itemName);
  //   {
  //     console.log(`Deleting item: ${myList.itemName}`);
  //   }
  if (window.confirm("Are you sure you want to delete this list item?")){
    try {
      await deleteListItem(listItemId).unwrap();
    } catch (error) {
      console.error("failed to delete list item:", error);
    }
  }
  };

  return (
    <>
    <table>
      <tbody>
        <tr>
          <th>
           <h1>List Details</h1>
          <h2>{myList.name}</h2>
          {myList.listItems.map((listItem) => (
            <li key={listItem.id}>
              <h2>{listItem.itemName}</h2>
              {editMode === listItem.id ? (
                    <>
                      <input
                        type="text"
                        value={newName || ""}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <button onClick={() => handleUpdate(listItem.id)}>Save</button>
                      <button onClick={() => setEditMode(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit (listItem.id, listItem.name)}
                      >Edit</button>
                      <button onClick={() => handleDelete(listItem.id)}>Delete</button>
                    </>
                  )}
            </li>
          ))}
        {/* </li>
      </ul> */}
      </th>
      </tr>
      </tbody>
      </table>
    </>
  );
};

  //   return (
  //     <>
  //       <h1>List Details</h1>
  //       <ul>
  //         <li>
  //           {console.log(myList)}
  //           <h2>{myList.name}</h2>
  //           <p>
  //             <b>Description:</b> {myList.details}
  //           </p>
  //           <p>
  //             <b>Owner: </b>
  //             {myList.ownerId}
  //           </p>
  //           <p>
  //             <b>Items: </b>
  //             {myList.length}
  //           </p>
  //           <ListDetails />
  //           <div>
  //             <button onClick={() => handleEdit()}>Edit List</button>
  //             <button onClick={() => handleDelete()}>Delete</button>
  //           </div>
  //           <div>
  //             {myList.items.map((item, index) => (
  //               <p key={index}>{myList.name}</p>
  //             ))}
  //           </div>
  //         </li>
  //       </ul>
  //     </>
  //   );
