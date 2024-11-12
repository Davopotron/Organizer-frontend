import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from '../layout/Footer';
import About from './features/about';
import Contact from '/features/Contact';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path='./features/about'
            element={<About />}
          />
          <Route
            path='./features/Contact'
            element={<Contact />}
          />
          {/* Add more routes here if needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
