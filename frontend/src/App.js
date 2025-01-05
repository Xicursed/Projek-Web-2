import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import AddProducts from './addProduct';
import UpdateProducts from './updateProducts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <h1>E-Commerce Dashboard</h1>
        <Routes>
          <Route path="/register" 
          element={< Register />} />
          <Route path="/login" 
          element={< Login />} />
          <Route path="/add" 
          element={< AddProducts />} />
          <Route path="/update" 
          element={< UpdateProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
