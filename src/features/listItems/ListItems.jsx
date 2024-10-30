// import { useSelector } from "react-redux";
// import {
//   useDeleteListMutation,
//   useGetListQuery,
// } from "./listSlice";
// import { useParams, Navigate } from "react-router-dom";
// import { useState } from "react";
// import UpdateListForm from "./UpdateListForm";
// import "./listDetails.css";


//need to get ListItems to render onto the individual list page via ListDetails from ListItems
// import React from "react"; 
// import {userParams} from "react-router-dom"
 
// const ListItems = 

import { useState } from "react";
import ListDetails from "./ListDetails";
import { useGetListItemsQuery } from "./listItemsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

//Function that renders a singular list's items

export default function ItemRender() {
    const { data: listItem = [], isLoading, error } = useGetListItemsQuery();
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    if (isLoading) return <h2>Loading Item</h2>;

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!)
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