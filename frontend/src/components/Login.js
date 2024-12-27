import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>{role === 'student' ? 'Student Login' : 'Admin Login'}</h2>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setRole('student')}
          style={{
            marginRight: '10px',
            padding: '10px',
            backgroundColor: role === 'student' ? '#007BFF' : '#CCC',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Student
        </button>
        <button
          onClick={() => setRole('admin')}
          style={{
            padding: '10px',
            backgroundColor: role === 'admin' ? '#007BFF' : '#CCC',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Admin
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>{role === 'student' ? 'CET Number' : 'Admin ID'}</label>
          <input
            type="text"
            value={cetNumber}
            onChange={(e) => setCetNumber(e.target.value)} // Store cet_number in state
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {role === 'student' && allocatedCollege && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <p>{allocatedCollege}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
