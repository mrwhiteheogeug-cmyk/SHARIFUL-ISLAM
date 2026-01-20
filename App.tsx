
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import GlobalBackground from './components/GlobalBackground';

// Lazy loading the "separate page" components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Album = lazy(() => import('./pages/Album'));
const Contact = lazy(() => import('./pages/Contact'));

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/album', label: 'Album' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
      <ul className="flex space-x-8 md:space-x-12">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path}
              className={`text-sm md:text-lg font-medium transition-all duration-300 hover:text-sky-400 relative py-2 ${
                location.pathname === item.path ? 'text-sky-400' : 'text-gray-300'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 rounded-full animate-pulse" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-black">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/album" element={<Album />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
