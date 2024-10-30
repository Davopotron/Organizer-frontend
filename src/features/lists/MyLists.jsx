import {useState} from 'react';
import ListDetails from './ListDetails';
// import {useGetListQuery} from '../../store/facultySlice';
import {useSelector} from 'react-redux';
// import {selectToken} from '../../store/authSlice';
import {Link} from 'react-router-dom';

// Function that renders a list of all lists
export default function ItemsList() {
  const {data: items, error, isLoading} = useGetFacultyQuery();
  const token = useSelector(selectToken);

  const [filter, setFilter] = useState('');
  const searchRegex = new RegExp(filter, 'i');

  if (isLoading) return <h2>Loading List...</h2>;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!items.length) {
    return <p>There are no items.</p>;
  }

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
        {professors
          .filter((items) => item.name.match(searchRegex))
          .sort((a, z) => a.name.localeCompare(z.name))
          .map((item) => (
          ))}
      </ul>
    </main>
  );
}
