// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Fetch user choices or other relevant data
      axios
        .get('http://localhost:3100/choices/1', { // Replace with actual student ID
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setChoices(response.data.choices);
        })
        .catch((err) => {
          setError('Error fetching choices');
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p>{error}</p>}
      <ul>
        {choices.map((choice, index) => (
          <li key={index}>
            Branch: {choice.branch_id}, Priority: {choice.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
