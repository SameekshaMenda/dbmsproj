import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatData = () => {
  const [branches, setBranches] = useState([]);
  const [choices, setChoices] = useState([{ college: '', branch: '' }]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/branches'); // Correct backend URL
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleChoiceChange = (index, event) => {
    const { name, value } = event.target;
    const newChoices = [...choices];
    newChoices[index][name] = value;
    setChoices(newChoices);
  };

  const addChoiceRow = () => {
    setChoices([...choices, { college: '', branch: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1234/api/submitChoices', { choices }); // Correct endpoint
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting choices:', error);
      setMessage('Failed to submit choices.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Seat Data</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>College Name</th>
            <th>Branch</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={index}>
              <td>{branch.college_name}</td>
              <td>{branch.branch_name}</td>
              <td>{branch.available_seats}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Enter Your Choices</h2>
      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Priority</th>
              <th>College Name</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {choices.map((choice, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="college"
                    value={choice.college}
                    onChange={(e) => handleChoiceChange(index, e)}
                    placeholder="Enter College Name"
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="branch"
                    value={choice.branch}
                    onChange={(e) => handleChoiceChange(index, e)}
                    placeholder="Enter Branch"
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addChoiceRow} style={{ marginRight: '10px', padding: '5px 10px' }}>
          Add Another Choice
        </button>
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white' }}>
          Submit Choices
        </button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default SeatData;
