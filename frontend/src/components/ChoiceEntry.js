import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChoiceEntry = () => {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch branch details
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/branches');
        setBranches(response.data);
      } catch (err) {
        setError('Failed to fetch branch data');
      }
    };

    fetchBranches();
  }, []);

  // Function to navigate after data is fetched or other actions
  const handleNavigation = () => {
    navigate('/SeatDataAndChoiceEntry'); // Navigate to the SeatData page
  };

  return (
    <div style={{ margin: '20px auto', textAlign: 'center', maxWidth: '800px' }}>
      <h2>Choice Entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>College Name</th>
            <th>Total Seats</th>
            <th>Available Seats</th>
            <th>Selected Seats</th>
            <th>Applicants</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.branch_id}>
              <td>{branch.branch_name}</td>
              <td>{branch.college_name}</td>
              <td>{branch.total_seats}</td>
              <td>{branch.available_seats}</td>
              <td>{branch.selected_seats}</td>
              <td>{branch.applicants}</td> {/* Show the number of applicants */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button to trigger navigation */}
      <button
        onClick={handleNavigation}
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Go to Seat Data and Choice Entry
      </button>
    </div>
  );
};

export default ChoiceEntry;
