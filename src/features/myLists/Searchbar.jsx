import { useState } from "react";

function SearchBar({ names = [], onSearch }) {
  const [filter, setFilter] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = () => {
    const results =
      names?.filter((name) =>
        name.name.toLowerCase().includes(filter.trim().toLowerCase())
      ) || [];
    setFilteredResults(results);
    onSearch(results);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>

      <div>
        {filteredResults.length > 0 ? (
          <ul>
            {filteredResults.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          filter && <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
