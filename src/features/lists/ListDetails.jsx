import React from "react";
import { useParams } from "react-router-dom";
import { useGetMyListQuery } from "./listSlice";
// import ListItems from "../listItems/ListItems";
// import {useGetProfessorQuery} from '../../store/facultySlice';

// export default function Professor() {
export default function ListDetails() {
  const { id } = useParams();
  const { data: myList, isLoading } = useGetMyListQuery(id);
  //console.log(list);
  if (isLoading) return <p>Loading...</p>;

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <>
      <h1>List Details</h1>
      <ul>
        <li>
          {console.log(myList)}
          <h2>{myList.name}</h2>
          <p>
            <b>Description:</b> {myList.details}
          </p>
          <p>
            <b>Owner: </b>
            {myList.ownerId}
          </p>
          {/* <ListItems /> */}
          <div>
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
