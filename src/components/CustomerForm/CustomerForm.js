import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const { first_name, last_name, phone_number, email } = formData;
    if (!/^[a-zA-Z]+$/.test(first_name) || !/^[a-zA-Z]+$/.test(last_name)) {
      return 'Names must contain only letters.';
    }
    if (!/^\d{10}$/.test(phone_number)) {
      return 'Phone number must be 10 digits.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post('https://qwipobackend.onrender.com/customers', formData);
      navigate('/');
    } catch (err) {
      setError('Failed to add customer.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="customer-form-container">
      <h2 className='form-heading'>Add Customer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          className='input'
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          className='input'
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className='input'
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className='input'
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className='input'
        ></textarea>
        <button type="submit" className='add-btn'>Add Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
