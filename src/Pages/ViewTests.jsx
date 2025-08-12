import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestCard from '../Components/TestCard';

export default function ViewTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/tests')
      .then(response => {
        setTests(response.data);  
        setLoading(false);
      })
      .catch(() => {
        setError('Tests load panna mudiyala');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Tests load aagudhu...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Tests</h3>
      {tests.length === 0 && <p>Tests illa</p>}
      {tests.map(test => <TestCard key={test._id} test={test} />)}
    </div>
  );
}
