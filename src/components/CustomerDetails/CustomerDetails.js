import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './index.css'

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`https://qwipobackend.onrender.com/customers/${id}`);
      setCustomer(response.data);
    } catch (err) {
      setError('Failed to fetch customer details');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://qwipobackend.onrender.com/customers/${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  return (
    <div className="customer-details-container">
      {error && <p className="error">{error}</p>}
      <h2 className='heading'>Customer Details</h2>
      <p className='name'><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
      <p className='name'><strong>Phone:</strong> {customer.phone_number}</p>
      <p className='name'><strong>Email:</strong> {customer.email}</p>
      <p className='name'><strong>Address:</strong> {customer.address}</p>
      <button onClick={handleDelete} className='delete-btn'>Delete Customer</button>
    </div>
  );
};

export default CustomerDetails;
