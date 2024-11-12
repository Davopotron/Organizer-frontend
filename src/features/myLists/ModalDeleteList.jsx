import "../../css/modal.css";
import React from "react";

const Modal = ({ handleClose, handleConfirm }) => {
  return (
    //Handle deleting a list
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Are you sure you want to delete this list?</h2>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
