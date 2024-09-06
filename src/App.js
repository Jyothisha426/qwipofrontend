import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './components/CustomerForm/CustomerForm'
import CustomerList from './components/CustomerList/CustomerList';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
