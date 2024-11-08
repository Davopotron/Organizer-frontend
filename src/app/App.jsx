import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from '../layout/Footer';
import About from './features/about';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path='./features/about'
            element={<About />}
          />
          {/* Add more routes here if needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
