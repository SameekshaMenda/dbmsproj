import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login'; // Ensure the path is correct
import Dashboard from './components/Dashboard'; // Ensure the path is correct
import ChoiceEntry from './components/ChoiceEntry';
import SeatData from './components/SeatData'; // Fixed: Capitalized the component name
import AdminDashboard from './components/AdminDashboard';
import SubmittedPage from './components/SubmittedPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Use LoginPage here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ChoiceEntry" element={<ChoiceEntry />} />
        <Route path="/SeatDataAndChoiceEntry" element={<SeatData />} /> {/* Updated */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/submitted" element={<SubmittedPage />} />
      </Routes>
    </Router>
  );
};

export default App;


