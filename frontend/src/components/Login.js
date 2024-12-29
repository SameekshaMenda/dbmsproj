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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: '100%',
          maxWidth: '1000px',
          minWidth: '600px',
          padding: '100px',
          borderRadius: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '3px solid black',
        }}
      >
        <h2 className="text-center mb-5" style={{ fontSize: '70px', fontWeight: 'bold' }}>
          {role === 'student' ? 'Student Login' : 'Admin Login'}
        </h2>
        <div className="d-flex justify-content-center mb-5">
          <button
            onClick={() => setRole('student')}
            className={`btn ${role === 'student' ? 'btn-dark' : 'btn-outline-dark'} mx-5 px-5 py-3`}
            style={{
              fontSize: '36px',
              borderRadius: '50px',
              backgroundColor: role === 'student' ? '#003366' : '',
              color: role === 'student' ? 'white' : 'black',
            }}
          >
            Student
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`btn ${role === 'admin' ? 'btn-dark' : 'btn-outline-dark'} mx-5 px-5 py-3`}
            style={{
              fontSize: '36px',
              borderRadius: '50px',
              backgroundColor: role === 'admin' ? '#003366' : '',
              color: role === 'admin' ? 'white' : 'black',
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
                fontSize: '48px',
                padding: '30px',
                height: '80px',
              }}
            />
          </div>
          <div className="mb-5">
            <label className="form-label" style={{ fontSize: '36px', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                fontSize: '48px',
                padding: '30px',
                height: '80px',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 py-3"
            style={{
              fontSize: '48px',
              borderRadius: '50px',
              backgroundColor: '#003366',
              color: 'white',
            }}
          >
            Login
          </button>
        </form>
        {error && <p className="text-danger mt-5" style={{ fontSize: '36px' }}>{error}</p>}
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
