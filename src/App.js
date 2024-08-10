import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudent from './pages/AddShoes';
import EditStudent from './pages/EditShoes';
import Home from './pages/Home';
import Header from './component/Header';
import SearchStudent from './pages/SearchShoes';
import './App.css';

function App() {
  return (
    <Router>
      <Header />  {/* Include Header component */}
      <div className="App">
        <Routes>
          <Route path="/add-shoes" element={<AddStudent />} />
          {/* <Route path="/Home" element={<Home />} /> */}
          <Route path="/edit-shoes/:id" element={<EditStudent />} />
          <Route path="/search-shoes" element={<SearchStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
