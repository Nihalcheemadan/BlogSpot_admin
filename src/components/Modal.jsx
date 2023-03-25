import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ReportModal({ isOpen, onRequestClose, onSubmit }) {
  const [numReports, setNumReports] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ numReports, reason });
    setNumReports('');
    setReason('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Report Modal"
    >
      <h2>Report Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numReports">Number of Reports:</label>
          <input
            id="numReports"
            type="number"
            value={numReports}
            onChange={(e) => setNumReports(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <input
            id="reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default ReportModal;
