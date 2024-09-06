import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`https://qwipobackend.onrender.com/customers/page/${page}`, {
        params: { search },
      });
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch customers');
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && page < totalPages) setPage(page + 1);
    if (direction === 'prev' && page > 1) setPage(page - 1);
  };

  return (
    <div className="customer-list-container">
      <h2 className='customer-list-heading'>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name, email, address..."
        value={search}
        onChange={handleSearch}
        className='input'
      />
      <div className="customer-list">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <p className='cust-details'>{customer.first_name} {customer.last_name}</p>
            <p className='number'>{customer.phone_number}</p>
            <Link to={`/customer/${customer.id}`} className='view-details'>View Details</Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange('prev')} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange('next')} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
