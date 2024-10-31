import { useState } from "react";
import ListDetails from "./ListDetails";
import { useGetListItemsQuery } from "./listItemsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

//Function that renders a singular list's items

export default function RenderItem() {
    const { data: listItem = [], isLoading, error } = useGetListItemsQuery();
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    if (isLoading) return <h2>Loading Item</h2>;

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!)

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














// return (
//     <article>
//       <h1>Departments</h1>
//       <div className="departmentGroup">
//         <div className="listOfDepartments">
//           <ul className="departments">
//             {isLoading && <li>Loading departments...</li>}
//             {departments.map((department) => (
//               <li key={department.id}>
//                 <h2>{department.name}</h2>
//                 <figure>
//                   <h3>{department.description}</h3>
//                   <h2>{department.email}</h2>
//                   <h2>{department.phone}</h2>
//                   <img src={department.imageUrl} alt={department.name} />
//                 </figure>
//                 <button onClick={() => handleSeeDetails(department.id)}>
//                   See Details
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="departmentForm">
//           <DepartmentForm />
//         </div>
//       </div>
//     </article>
//   );

// export default ListItems