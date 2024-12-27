import React, { useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle closing the choice entry
  const handleCloseChoiceEntry = async () => {
    setLoading(true);
    setError('');
    try {
      // Call the backend API to close choice entry
      const response = await axios.post('http://localhost:1234/admin/close-choice-entry');
      setMessage(response.data.message); // Display success message from backend
    } catch (err) {
      setError('Error closing choice entry. Please try again later.');
      console.error(err); // Log the error to the console for debugging
    }
    setLoading(false);
  };

  // Function to handle processing the seat allotment
  const handleProcessSeatAllotment = async () => {
    setLoading(true);
    setError('');
    try {
      // Call the backend API to process seat allotment
      const response = await axios.post('http://localhost:1234/admin/process-seat-allotment');
      setMessage(response.data.message); // Display success message from backend
    } catch (err) {
      setError('Error processing seat allotment. Please try again later.');
      console.error(err); // Log the error to the console for debugging
    }
    setLoading(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="buttons">
        <button onClick={handleCloseChoiceEntry} disabled={loading}>
          {loading ? 'Closing Choice Entry...' : 'Close Choice Entry'}
        </button>
        <button onClick={handleProcessSeatAllotment} disabled={loading}>
          {loading ? 'Processing Seat Allotment...' : 'Process Seat Allotment'}
        </button>
      </div>

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}
    </div>
  );
};

export default AdminDashboard;
