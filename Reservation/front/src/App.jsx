import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Reservations from './Reservations';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/reservations">Reservations</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
