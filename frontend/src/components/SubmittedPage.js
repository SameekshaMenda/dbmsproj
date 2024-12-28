import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS
import styles from '../styles/SubmittedPage.module.css';  // Import the CSS module

const SubmittedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cetNumber, setCetNumber] = useState(null);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const cetNumberFromState = location.state?.cetNumber;
        const choicesFromState = location.state?.choices;
        const queryParams = new URLSearchParams(window.location.search);
        const cetNumberFromParams = queryParams.get('cetNumber');

        const cetNumberToUse = cetNumberFromState || cetNumberFromParams;
        if (!cetNumberToUse) {
          throw new Error('CET Number is required');
        }

        setCetNumber(cetNumberToUse);

        if (!choicesFromState) {
          const response = await fetch(`/api/choices/${cetNumberToUse}`);
          if (!response.ok) {
            throw new Error('Failed to fetch choices');
          }

          const data = await response.json();
          setChoices(data);
        } else {
          setChoices(choicesFromState);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChoices();
  }, [location.state]);

  if (loading) {
    return <div className="text-center my-5" style={{ fontSize: '5rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger" style={{ fontSize: '3rem' }}>Error: {error}</p>
        <button className="btn btn-dark btn-lg" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  if (!choices || choices.length === 0) {
    return (
      <div className="text-center my-5">
        <p style={{ fontSize: '3rem' }}>No data to display. Please submit choices first.</p>
        <button className="btn btn-dark btn-lg" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={`container ${styles.container}`}>
      <p className={`h1 ${styles.title} text-center text-dark-blue`}>Submitted Choices</p>
      <p className="text-dark text-center" style={{ fontSize: '3rem' }}>You Have Successfully Entered Your Choices</p>
      <p className="text-dark text-center" style={{ fontSize: '2rem' }}><strong className={styles.strong}>CET Number:</strong> {cetNumber}</p>
      <div className="table-responsive">
        <table className={`table table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th className={styles.th} style={{ fontSize: '2.5rem' }}>Priority</th>
              <th className={styles.th} style={{ fontSize: '2.5rem' }}>College Name</th>
              <th className={styles.th} style={{ fontSize: '2.5rem' }}>Branch Name</th>
            </tr>
          </thead>
          <tbody>
            {choices.map((choice, index) => (
              <tr key={index}>
                <td className={styles.td} style={{ fontSize: '2.5rem' }}>{choice.priority}</td>
                <td className={styles.td} style={{ fontSize: '2.5rem' }}>{choice.college_name}</td>
                <td className={styles.td} style={{ fontSize: '2.5rem' }}>{choice.branch_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="go-back-button" onClick={() => navigate("/")} style={{ fontSize: '3rem', padding: '25px 50px' }}>Go Back</button>
      </div>
    </div>
  );
};

export default SubmittedPage;
