// frontend/src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/spares.png'; // Place your logo image here

const Welcome = () => {
  return (
    <div className="welcome-container" style={{ textAlign: 'center', padding: '2rem' }}>
      <img src={logo} alt="Company Logo" style={{ width: 150 }} />
      <h1>Welcome to AutoParts Inventory System</h1>
      <p><strong>Company:</strong> RapidFix Auto Spares Ltd</p>
      <p><strong>Address:</strong> 12 Main Street, Industrial Layout, Lagos</p>
      <p><strong>Phone:</strong> +234 803 123 4567</p>
      <p><strong>Email:</strong> info@rapidfixautoparts.com</p>
      <Link to="/login">
        <button style={{ marginTop: '2rem', padding: '10px 20px' }}>Go to Login</button>
      </Link>
    </div>
  );
};

export default Welcome;
