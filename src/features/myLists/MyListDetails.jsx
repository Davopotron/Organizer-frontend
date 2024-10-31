import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useGetMyListQuery} from './myListsSlice';
import ListItems from '../listItems/ListItems';
import {useSelector} from 'react-redux';
// import {useGetProfessorQuery} from '../../store/facultySlice';

// export default function Professor() {
export default function ListDetails() {
  const {id} = useParams();
  const {data: myList, isLoading} = useGetMyListQuery(id);

  // const token = useSelector(selectToken);
  // const navigate = useNavigate();

  //console.log(list);
  if (isLoading) return <p>Loading...</p>;

  const handleEdit = () => {
    console.log('Edit clicked');
    const newName = ('Enter new list details:', myList.itemName);
    const newDetail = ('Enter new detail:', myList.detail);
    if (newName !== null && newDetail !== null) {
      myList.itemName = newName;
      myList.detail = newDetail;
    }
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    {
      console.log(`Deleting item: ${myList.itemName}`);
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
          {myList.listItems.map((listItem) => (
            <li key={listItem.id}>
              <h2>{listItem.itemName}</h2>
            </li>
          ))}
          <div>
            <button onClick={() => handleSeeDetails()}>Details</button>
            <button onClick={() => handleEdit()}>Edit List</button>
            <button onClick={() => handleDelete()}>Delete</button>
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
