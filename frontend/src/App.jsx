import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PetList from './components/PetList';
import './index.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <div className="brand-mark">
          <PawPrint size={20} color="#05120e" strokeWidth={2.5} />
        </div>
        <span className="brand-name">Paw<span>Care</span></span>
      </NavLink>

      <ul className="navbar-nav">
        <li>
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <LayoutDashboard size={15} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/pets" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <PawPrint size={15} />
            All Pets
          </NavLink>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-badge">
          <span className="dot" />
          API Live
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"     element={<Dashboard />} />
        <Route path="/pets" element={<PetList />} />
      </Routes>
    </BrowserRouter>
  );
}
