import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://randomuser.me/api';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const {title, first, last } = response.data.results[0].name;
      const email = response.data.results[0].email;
      const user = {
        title: title,
        firstName: first,
        lastName: last,
        email: email
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUserData(user);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      const response = await axios.get(API_URL);
      const {title, first, last } = response.data.results[0].name;
      const email = response.data.results[0].email;
      const user = {
        title: title,
        firstName: first,
        lastName: last,
        email: email
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUserData(user);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      {userData ? (
        <>
          <h1>{userData.title} {userData.firstName} {userData.lastName}</h1>
          <p>{userData.email}</p>
          <button onClick={refreshData}>Refresh</button>
        </>
      ) : (
        <p>{error || 'Loading...'}</p>
      )}
    </div>
  );
}

export default App;
