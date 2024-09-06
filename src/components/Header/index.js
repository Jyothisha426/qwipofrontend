import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Customer Management</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Customer List</Link>
          </li>
          <li>
            <Link to="/add-customer" className="add-customer-btn">
              Add Customer
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
