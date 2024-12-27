import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatData = () => {
  const [branches, setBranches] = useState([]);
  const [choices, setChoices] = useState([{ college_name: '', branch_name: '' }]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [cetNumber, setCetNumber] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/branches');
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleChoiceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedChoices = [...choices];
    updatedChoices[index][name] = value;
    setChoices(updatedChoices);
  };

  const addChoiceRow = () => {
    setChoices([...choices, { college_name: '', branch_name: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate input
    if (!cetNumber) {
      setError('CET Number is required.');
      return;
    }
    const hasEmptyChoice = choices.some(
      (choice) => !choice.college_name || !choice.branch_name
    );
    if (hasEmptyChoice) {
      setError('All choices must have both College Name and Branch selected.');
      return;
    }

    const payload = {
      cet_number: cetNumber,
      choices: choices.map((choice, index) => ({
        college_name: choice.college_name,
        branch_name: choice.branch_name,
        priority: index + 1,
      })),
    };

    try {
      console.log('Payload being sent:', payload);

      const response = await axios.post('http://localhost:1234/api/submitChoices', payload);
      setMessage(response.data.message);
      setChoices([{ college_name: '', branch_name: '' }]);
      setCetNumber('');
    } catch (error) {
      console.error('Error submitting choices:', error);
      setError('Failed to submit choices. Please try again.');
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', fontSize: '2vw' }}>Seat Data</h2>
      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        style={{
          width: '100%',
          marginBottom: '20px',
          borderCollapse: 'collapse',
          backgroundColor: '#f9f9f9',
          fontSize: '1.2vw',
        }}
      >
        <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
          <tr>
            <th>College Name</th>
            <th>Branch</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{branch.college_name}</td>
              <td>{branch.branch_name}</td>
              <td>{branch.available_seats}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ color: '#333', fontSize: '2vw' }}>Enter Your Choices</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="cet_number" style={{ marginRight: '10px', fontSize: '1.5vw' }}>
            CET Number:
          </label>
          <input
            type="text"
            id="cet_number"
            value={cetNumber}
            onChange={(e) => setCetNumber(e.target.value)}
            placeholder="Enter CET Number"
            required
            style={{
              padding: '1vw',
              width: '30%',
              fontSize: '1.2vw',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{
            width: '100%',
            marginBottom: '20px',
            borderCollapse: 'collapse',
            backgroundColor: '#f9f9f9',
            fontSize: '1.2vw',
          }}
        >
          <thead style={{ backgroundColor: '#28a745', color: 'white' }}>
            <tr>
              <th>Priority</th>
              <th>College Name</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {choices.map((choice, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{index + 1}</td>
                <td>
                  <select
                    name="college_name"
                    value={choice.college_name}
                    onChange={(e) => handleChoiceChange(index, e)}
                    required
                    style={{
                      padding: '0.8vw',
                      width: '60%',
                      fontSize: '1vw',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  >
                    <option value="">Select College</option>
                    {branches.map((branch, idx) => (
                      <option key={idx} value={branch.college_name}>
                        {branch.college_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    name="branch_name"
                    value={choice.branch_name}
                    onChange={(e) => handleChoiceChange(index, e)}
                    required
                    style={{
                      padding: '0.8vw',
                      width: '60%',
                      fontSize: '1vw',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  >
                    <option value="">Select Branch</option>
                    {branches
                      .filter((branch) => branch.college_name === choice.college_name)
                      .map((branch, idx) => (
                        <option key={idx} value={branch.branch_name}>
                          {branch.branch_name}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={addChoiceRow}
          style={{
            padding: '0.8vw 1.5vw',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '15px',
            fontSize: '1vw',
          }}
        >
          Add Another Choice
        </button>
        <button
          type="submit"
          style={{
            padding: '0.8vw 1.5vw',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1vw',
          }}
        >
          Submit Choices
        </button>
      </form>

      {error && <p style={{ marginTop: '20px', color: 'red', fontSize: '1vw' }}>{error}</p>}
      {message && <p style={{ marginTop: '20px', color: 'green', fontSize: '1vw' }}>{message}</p>}
    </div>
  );
};

export default SeatData;
