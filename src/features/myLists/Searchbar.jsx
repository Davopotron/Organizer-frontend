import { useState } from "react";

function SearchBar({ names = [], onSearch }) {
  const [filter, setFilter] = useState("");

  const handleSearch = () => {
    const results =
      names?.filter((name) =>
        name.name.toLowerCase().includes(filter.trim().toLowerCase())
      ) || [];
    onSearch(results); // Pass results to the parent
  };

  // Trigger search on input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value.trim() === "") {
      onSearch([]); // Clear the filtered results if input is empty
    } else {
      handleSearch();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={handleInputChange} // Call search on every input change
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
