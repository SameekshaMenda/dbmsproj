import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem('user')); // Assuming the student data is stored here after login.

    if (!student) {
      // Redirect to login if no student data found
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.post('http://localhost:1234/dashboard', {
          cet_number: student.cet_number, // Send the cet_number to the server
        });

        if (response.data.student) {
          setStudentData(response.data.student);
        } else {
          setError('Student data not found.');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleProceed = () => {
    navigate('/ChoiceEntry'); // Navigate to the next page (ChoiceEntry or other)
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dashboard</h2>
      {error && <p style={styles.error}>{error}</p>}

      {loading ? (
        <p style={styles.loading}>Loading student details...</p>
      ) : studentData ? (
        <div style={styles.card}>
          <h3 style={styles.cardHeader}>Student Details</h3>
          <p><strong>CET Number:</strong> {studentData.cet_number}</p>
          <p><strong>Name:</strong> {studentData.name || 'N/A'}</p>
          <p><strong>Rank:</strong> {studentData.rank_number || 'N/A'}</p>
          <button onClick={handleProceed} style={styles.button}>Proceed</button>
        </div>
      ) : (
        <p style={styles.error}>No student details available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: '16px',
  },
  loading: {
    color: '#555',
    fontSize: '18px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
  },
  cardHeader: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#444',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

styles.button[':hover'] = {
  backgroundColor: '#218838',
};

export default Dashboard;
