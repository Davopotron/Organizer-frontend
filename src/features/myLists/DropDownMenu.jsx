import React from "react";
import "../../css/MyLists.css";

const Dropdown = ({
  isNearMe,
  listItemsForThisList,
  onListClick,
  handleSeeDetails,
  handleEditClick,
  handleDelete,
  m,
}) => {
  return (
    <div className="dropdownMenu">
      {isNearMe ? (
        <ul className="dropdownItems">
          {listItemsForThisList.length > 0 ? (
            listItemsForThisList.map((item) => (
              <li
                key={item.id}
                className="dropdownItem"
                onClick={() => onListClick(item.itemName)}
              >
                {item.itemName}
              </li>
            ))
          ) : (
            <li>No ingredients</li>
          )}
        </ul>
      ) : (
        <div className="dropdownItems">
          <button onClick={() => handleSeeDetails(m.id)}>See Details</button>
          <button onClick={() => handleEditClick(m.id, m.name, m.description)}>
            Edit
          </button>
          <button onClick={() => handleDelete(m.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
