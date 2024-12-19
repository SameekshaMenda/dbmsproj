import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChoiceEntry = () => {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  // Handle branch selection
  const handleSelect = async (branch_id) => {
    try {
      await axios.post('http://localhost:1234/api/select-branch', { branch_id });
      alert('Branch selected successfully!');
      window.location.reload(); // Reload to get updated data
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to select branch');
    }
  };

  // Navigate to SeatDataAndChoiceEntry page
  const handleNavigate = () => {
    navigate('/SeatDataAndChoiceEntry');
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
            <th>Action</th>
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
              {/* <td>
                <button
                  onClick={() => handleSelect(branch.branch_id)}
                  disabled={branch.available_seats <= 0}
                  style={{
                    backgroundColor: branch.available_seats > 0 ? '#28a745' : '#ccc',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: branch.available_seats > 0 ? 'pointer' : 'not-allowed',
                    borderRadius: '5px',
                  }}
                >
                  Select
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Button to navigate to SeatDataAndChoiceEntry Page */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleNavigate}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Go to Seat Data and Choice Entry Page
        </button>
      </div>
    </div>
  );
};

export default ChoiceEntry;
