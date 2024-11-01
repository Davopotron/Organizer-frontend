import React from 'react';
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
  // const token = useSelector(selectToken);
  // const navigate = useNavigate();

  //console.log(list);
  if (isLoading) return <p>Loading...</p>;

  // const handleEdit = () => {
  //   console.log('Edit clicked');
  //   const newName = ('Enter new list details:', myList.itemName);
  //   const newDetail = ('Enter new detail:', myList.detail);
  //   if (newName !== null && newDetail !== null) {
  //     // myList.itemName = newName;
  //     myList.detail = newDetail;
  //   }
  // };

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
      <h1>List Details</h1>
      <ul>
        <li>
          <h2>{myList.name}</h2>
          <p>
            <b>Description:</b> {myList.details}
          </p>
          <p>
            <b>Owner: </b>
            {myList.ownerId}
          </p>
          {/* <ListItems /> */}
          {listItems.map((listItem) => (
            <li key={listItem.id}>
              <h2>{listItem.itemName}</h2>
              <button onClick={() => handleDelete(listItem.id)}>Delete</button>
            </li>
          ))}
          <div>
            {/* <button onClick={() => handleSeeDetails()}>Details</button> */}
            <button onClick={() => handleEdit()}>Edit List Items</button>
          </div>
        </li>
      </ul>
    </>
  );

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
}
