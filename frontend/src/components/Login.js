import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const Login = () => {
  const [cetNumber, setCetNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to student login
  const [error, setError] = useState('');
  const [allocatedCollege, setAllocatedCollege] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:1234/login', {
        cet_number: cetNumber,
        password: password,
        role: role,
      });

      if (response.data.message === 'Login successful') {
        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('cet_number', cetNumber); // Store CET number in localStorage

        if (response.data.choiceEntryClosed) {
          alert('Choice entry has been closed. You can view your student details.');
          navigate('/student-details'); // Redirect to student details if choice entry is closed
        } else {
          // Redirect to the dashboard or other appropriate page
          navigate(role === 'student' ? '/dashboard' : '/admin-dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error. Please try again.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{
        backgroundImage: 'url(/kcet4.avif)', // Path to the image in the public folder
        backgroundSize: 'cover', // Cover the whole background
        backgroundPosition: 'center', // Center the background
        backgroundAttachment: 'fixed', // Fix the background during scrolling
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: '100%',  // Full width for responsiveness
          maxWidth: '1000px', // Increased width for even larger form
          minWidth: '600px',  // Ensure responsiveness on smaller screens
          padding: '100px',    // Much larger padding for spacious form
          borderRadius: '30px', // Rounded corners for a more modern look
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
          border: '3px solid black', // Black border around the card
        }}
      >
        <h2 className="text-center mb-5" style={{ fontSize: '70px', fontWeight: 'bold' }}>
          {role === 'student' ? 'Student Login' : 'Admin Login'}
        </h2>
        <div className="d-flex justify-content-center mb-5">
          <button
            onClick={() => setRole('student')}
            className={`btn ${role === 'student' ? 'btn-dark' : 'btn-outline-dark'} mx-5 px-8 py-5`}
            style={{
              fontSize: '36px',
              padding: '30px',
              borderRadius: '50px', // More rounded edges for the button
              backgroundColor: role === 'student' ? '#003366' : '', // Dark blue background for selected button
              color: 'white', // White text color for better contrast
            }}
          >
            Student
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`btn ${role === 'admin' ? 'btn-dark' : 'btn-outline-dark'} mx-5 px-8 py-5`}
            style={{
              fontSize: '36px',
              padding: '30px',
              borderRadius: '50px', // More rounded edges for the button
              backgroundColor: role === 'admin' ? '#003366' : '', // Dark blue background for selected button
              color: 'white', // White text color for better contrast
            }}
          >
            Admin
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="form-label" style={{ fontSize: '36px', fontWeight: 'bold' }}>
              {role === 'student' ? 'CET Number' : 'Admin ID'}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={cetNumber}
              onChange={(e) => setCetNumber(e.target.value)}
              required
              style={{
                fontSize: '48px', // Increased font size for better visibility
                padding: '30px',
                height: '80px', // Very large input fields
              }}
            />
          </div>
          <div className="mb-5">
            <label className="form-label" style={{ fontSize: '36px', fontWeight: 'bold' }} >
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                fontSize: '48px', // Increased font size for better visibility
                padding: '30px',
                height: '80px', // Very large input fields
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 h-90 py-5"
            style={{
              fontSize: '48px',
              padding: '30px',
              borderRadius: '50px', // More rounded edges for the button
              backgroundColor: '#003366', // Dark blue background
              color: 'white', // White text color for better contrast
            }}
          >
            Login
          </button>
        </form>
        {error && <p className="text-danger mt-5" style={{ fontSize: '36px' }}>{error}</p>} {/* Larger error message */}
        {role === 'student' && allocatedCollege && (
          <div className="mt-5 text-success" style={{ fontSize: '36px' }}>
            <p>{allocatedCollege}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
