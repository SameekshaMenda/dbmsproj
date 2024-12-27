import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login'; // Ensure the path is correct
import Dashboard from './components/Dashboard'; // Ensure the path is correct
import ChoiceEntry from './components/ChoiceEntry';
import SeatData from './components/SeatData'; // Fixed: Capitalized the component name
<<<<<<< HEAD
import HomePage from './components/HomePage';
=======
import AdminDashboard from './components/AdminDashboard';

>>>>>>> 36a286a27df53dd25e8fd9e156ef05f74da767d7

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} /> {/* Use LoginPage here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ChoiceEntry" element={<ChoiceEntry />} />
        <Route path="/SeatDataAndChoiceEntry" element={<SeatData />} /> {/* Updated */}
<<<<<<< HEAD
        
=======
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
>>>>>>> 36a286a27df53dd25e8fd9e156ef05f74da767d7
      </Routes>
    </Router>
  );
};

export default App;


