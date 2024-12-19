// // src/components/Dashboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [choices, setChoices] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     } else {
//       // Fetch user choices or other relevant data
//       axios
//         .get('http://localhost:3100/choices/1', { // Replace with actual student ID
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setChoices(response.data.choices);
//         })
//         .catch((err) => {
//           setError('Error fetching choices');
//         });
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {error && <p>{error}</p>}
//       <ul>
//         {choices.map((choice, index) => (
//           <li key={index}>
//             Branch: {choice.branch_id}, Priority: {choice.priority}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;


//new 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch student data from local storage
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem('student'));

    if (!student) {
      // If no student data, redirect to login
      navigate('/');
      return;
    }

    // Fetch additional data from the server
    const fetchDashboardData = async () => {
      try {
        const response = await axios.post('http://localhost:1234/dashboard', {
          cet_number: student.cet_number,
          rank_number: student.rank_number || 'N/A', // Use dummy if not available
          name: student.name || 'N/A',
        });

        if (response.data.existingStudent) {
          setStudentData(response.data.existingStudent);
        } else {
          setStudentData(response.data.newStudentDetails);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch student data.');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Function to handle button click
  const handleProceed = () => {
    navigate('/ChoiceEntry'); // Replace '/next-page' with your desired route
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {studentData ? (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '20px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3>Student Details</h3>
          <p>
            <strong>CET Number:</strong> {studentData.cet_number}
          </p>
          <p>
            <strong>Name:</strong> {studentData.name || 'N/A'}
          </p>
          <p>
            <strong>Rank:</strong> {studentData.rank_number || 'N/A'}
          </p>
          {/* Add Proceed Button */}
          <button
            onClick={handleProceed}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Proceed
          </button>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default Dashboard;
