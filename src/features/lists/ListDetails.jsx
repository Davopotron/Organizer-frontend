import React from 'react';
import {useParams} from 'react-router-dom';
// import {useGetProfessorQuery} from '../../store/facultySlice';

// export default function Professor() {
export default function ListDetails() {
  const {id} = useParams();
  const {data: list, isLoading} = useGetListQuery(id);
  console.log(list);
  if (isLoading) return <p>Loading...</p>;

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    console.log('Delete clicked');
  };

  return (
    <>
      <h1>List Details</h1>
      <ul>
        <li>
          <h2>{list.name}</h2>
          <p>
            <b>Description:</b> {list.details}
          </p>
          <p>
            <b>Owner: </b>
            {username}
          </p>
          <p>
            <b>Items: </b>
            {list.items.length}
          </p>
          <div>
            <button onClick={() => handleEdit()}>Edit List</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
          <div>
            {list.items.map((item, index) => (
              <p key={index}>{list.name}</p>
            ))}
          </div>
        </li>
      </ul>
    </>
  );
}
