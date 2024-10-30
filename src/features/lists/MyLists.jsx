import { useState } from "react";
import ListDetails from "./ListDetails";
import { useGetMyListsQuery } from "./listSlice";
import { useGetMyListQuery } from "./listSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
//import AddListForm from "./AddListForm";

// Function that renders a list of all lists
export default function GetList() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const { data: MyLists = [], isLoading, error } = useGetMyListsQuery();

  if (isLoading) {
    return <h2>Loading List...</h2>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!MyLists.length) {
    return <p>There are no lists.</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th scope="col">
              <h1> My Lists</h1>
              <form>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>

              {MyLists.map((m) => (
                <li key={m.id} className="mainList">
                  <h2>
                    <p>{m.name}</p>
                    <p>{m.description}</p>
                  </h2>
                </li>
              ))}
            </th>
            {/* <th scope="col">
              {token && <AddListForm />}

              {token && <UpdateListForm />}
            </th> */}
          </tr>
        </tbody>
      </table>
    </>
  );
}
