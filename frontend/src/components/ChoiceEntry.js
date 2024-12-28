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
    <div style={{ margin: '40px', fontFamily: 'Arial, sans-serif' }}>
      {/* Align title to the left */}
      <h2 style={{ fontSize: '3vw', color: '#333', textAlign: 'left' }}>Choice Entry</h2>
      {error && <p style={{ color: 'red', fontSize: '2vw' }}>{error}</p>}

      {/* Align table to the left */}
      <table
        border="1"
        style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '15px',
          fontSize: '1.2vw',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          wordWrap: 'break-word',
          marginTop: '20px',
          textAlign: 'left', // Align table content to the left
        }}
      >
        <thead style={{ backgroundColor: '#003366', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>Branch Name</th>
            <th style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>College Name</th>
            <th style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>Total Seats</th>
            <th style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>Available Seats</th>
            <th style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>Selected Seats</th>
            <th style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>Applicants</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.branch_id} style={{ borderBottom: '2px solid #ddd' }}>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>{branch.branch_name}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>{branch.college_name}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>{branch.total_seats}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>{branch.available_seats}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>{branch.selected_seats}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>{branch.applicants}</td> {/* Show the number of applicants */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to trigger navigation */}
      <button
        onClick={handleNavigation}
        style={{
          marginTop: '20px',
          padding: '8px 15px', // Smaller button
          backgroundColor: '#003366', // Dark blue color
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2vw', // Adjusted font size for the button
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#00509E')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#003366')}
      >
        Go to Seat Data and Choice Entry
      </button>
    </div>
  );
};

export default ChoiceEntry;
