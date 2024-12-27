import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatDataAndChoiceEntry = () => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');

  // Fetch available branches and selected choices
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch selected choices of the user
        const selectedResponse = await axios.get('http://localhost:1234/api/get-selected-choices');
        setSelectedChoices(selectedResponse.data);

        // Fetch all available branches
        const branchesResponse = await axios.get('http://localhost:1234/api/branches');
        setBranches(branchesResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Handle selection of a branch
  const handleSelect = async (branch_id) => {
    try {
      await axios.post('http://localhost:1234/api/select-branch', { branch_id });
      setSelectedChoices((prevChoices) => [
        ...prevChoices,
        branches.find((branch) => branch.branch_id === branch_id),
      ]);
      alert('Branch selected successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to select branch');
    }
  };

  // Handle removing a branch from the selected choices
  const handleRemove = async (branch_id) => {
    try {
      await axios.post('http://localhost:1234/api/remove-choice', { branch_id });

      setSelectedChoices((prevChoices) =>
        prevChoices.filter((choice) => choice.branch_id !== branch_id)
      );
      alert('Branch removed successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to remove choice');
    }
  };

  return (
    <div style={{ margin: '20px auto', textAlign: 'center', maxWidth: '800px' }}>
      <h2>Seat Data and Choice Entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Your Selected Choices</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>College Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedChoices.map((choice) => (
            <tr key={choice.branch_id}>
              <td>{choice.branch_name}</td>
              <td>{choice.college_name}</td>
              <td>
                <button
                  onClick={() => handleRemove(choice.branch_id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Select Branches</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>College Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.branch_id}>
              <td>{branch.branch_name}</td>
              <td>{branch.college_name}</td>
              <td>
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
                  {branch.available_seats > 0 ? 'Select' : 'Out of Stock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeatDataAndChoiceEntry;
