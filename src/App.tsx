/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Presence from './pages/Presence';
import Experiments from './pages/Experiments';
import Thoughts from './pages/Thoughts';
import Essence from './pages/Essence';
import Contact from './pages/Contact';

// Reset scroll to the top when the section changes (not when opening an article,
// which keeps the same section) so you never land part-way down a new page.
function ScrollToTop() {
  const { pathname } = useLocation();
  const section = pathname.split('/')[1] || '';
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [section]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
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
