import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

function Logout() {
  const [isModalOpen, setModalOpen] = useState(true);

  
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {

    console.log('Logging out...');
    closeModal();
  };


  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Logout Confirmation"
        ariaHideApp={false}
      >
        <div>
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogout}>OK</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Logout;
