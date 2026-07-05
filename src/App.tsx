/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Presence from './pages/Presence';
import Experiments from './pages/Experiments';
import Thoughts from './pages/Thoughts';
import Essence from './pages/Essence';
import Contact from './pages/Contact';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/presence" element={<Presence />} />
              <Route path="/experiments" element={<Experiments />} />
              <Route path="/thoughts" element={<Thoughts />} />
              <Route path="/thoughts/:slug" element={<Thoughts />} />
              <Route path="/essence" element={<Essence />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
