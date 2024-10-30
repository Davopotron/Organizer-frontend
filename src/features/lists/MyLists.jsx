import { useState } from "react";
import ListDetails from "./ListDetails";
import { useGetListQuery } from "";
import { useSelector } from "react-redux";
// import {selectToken} from '../../store/authSlice';
import { Link, useNavigate } from "react-router-dom";
import AddListForm from "./AddListForm";

// Function that renders a list of all lists
export default function ItemsList() {
  const { data: myLists = [], isLoading, error } = useGetListQuery();
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  //const [filter, setFilter] = useState('');
  //const searchRegex = new RegExp(filter, 'i');

  if (isLoading) return <h2>Loading List...</h2>;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!items.length) {
    return <p>There are no items.</p>;
  }

  return (
    <article>
      <h1>My Lists</h1>
      <div className="listGroup">
        <div className="listOfLists">
          <ul className="lists">
            {isLoading && <li>Loading lists...</li>}
            {lists.map((list) => (
              <li key={list.id}>
                <h2>{list.name}</h2>
                <figure>
                  <h3>{list.description}</h3>
                </figure>
                <button onClick={() => handleSeeDetails(list.id)}>
                  See Details
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="listForm">
          <AddListForm />
        </div>
      </div>
    </article>
  );
  /*
  return (
    <main>
      <h1>List</h1>
      <form>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
      {token && <Link to={`/list/form`}>Create a new item</Link>}
      <ul className='listlists'>
        {lists
          .filter((items) => item.name.match(searchRegex))
          .sort((a, z) => a.name.localeCompare(z.name))
          .map((item) => (
          ))}
      </ul>
    </main>
  );
   */
}
