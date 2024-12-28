import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5" style={{ maxWidth: '2500px' }}>
      <h2 className="text-center mb-5" style={{ fontSize: '150px', fontWeight: 'bold', color: '#343a40' }}>
        Dashboard
      </h2>
      
      {error && <p className="text-danger text-center" style={{ fontSize: '80px', padding: '20px' }}>{error}</p>}

      {loading ? (
        <p className="text-center text-muted" style={{ fontSize: '80px', padding: '20px' }}>Loading student details...</p>
      ) : studentData ? (
        <div className="card shadow-lg p-8 mb-5" style={{ borderRadius: '50px', backgroundColor: '#f8f9fa' }}>
          <h3 className="card-header text-center" style={{ fontSize: '100px', fontWeight: 'bold', color: '#495057' }}>
            Student Details
          </h3>
          <div className="card-body" style={{ fontSize: '70px', padding: '50px' }}>
            <p><strong>CET Number:</strong> {studentData.cet_number}</p>
            <p><strong>Name:</strong> {studentData.name || 'N/A'}</p>
            <p><strong>Rank:</strong> {studentData.rank_number || 'N/A'}</p>
            <button
              onClick={handleProceed}
              className="btn"
              style={{
                fontSize: '100px',
                padding: '60px',
                backgroundColor: '#004085', // Dark blue button color
                color: 'white',
                borderRadius: '30px',
                border: 'none',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#003366'} // Darker blue on hover
              onMouseOut={(e) => e.target.style.backgroundColor = '#004085'} // Original color
            >
              Proceed
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-danger" style={{ fontSize: '80px', padding: '20px' }}>No student details available.</p>
      )}
    </div>
  );
};

export default Dashboard;
