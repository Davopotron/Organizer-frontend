import React from "react";
import "../../css/myLists.css";

/**
 * Dropdown component with either listItems or option to click see details, edit, or delete
 * @param {Object} props
 * @param {boolean} - Checks if in related list
 * @param {Array} -list items
 * @param {Function} -Triggered when dropdown is clicked
 * @param {Function} - Navigates to details of specific list
 * @param {Function} - Triggers editing list
 * @param {Function} - deletes list
 * @param {Object} - List being mapped over
 * */
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
      {/* If items in that specific list, show them. If not, show message. */}
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
        // If not in MyLists where NearMe is false, see action  items for navigating
        // to list details, editing list, or deleting list
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
