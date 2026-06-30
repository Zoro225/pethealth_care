import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PawPrint, Heart, AlertCircle, Syringe,
  ShieldOff, Stethoscope, ArrowRight, TrendingUp
} from 'lucide-react';
import { getDashboard, getAllPets } from '../api/petApi';

const PET_EMOJI = { Dog:'🐶', Cat:'🐱', Rabbit:'🐰', Bird:'🐦', Fish:'🐠', Hamster:'🐹', Other:'🐾' };
const emoji = t => PET_EMOJI[t] || '🐾';

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    if (end === 0) { setDisplay(0); return; }
    const step = Math.ceil(end / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 40);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

const STATS_CONFIG = [
  { key: 'totalPets',       label: 'Total Pets',     icon: PawPrint,   color: '--teal',   glow: 'rgba(6,214,160,0.3)'  },
  { key: 'healthyPets',     label: 'Healthy',        icon: Heart,      color: '--green',  glow: 'rgba(34,197,94,0.3)'  },
  { key: 'sickPets',        label: 'Sick / Ill',     icon: AlertCircle,color: '--red',    glow: 'rgba(244,63,94,0.3)'  },
  { key: 'vaccinatedPets',  label: 'Vaccinated',     icon: Syringe,    color: '--blue',   glow: 'rgba(59,130,246,0.3)' },
  { key: 'notVaccinatedPets', label: 'Unvaccinated', icon: ShieldOff,  color: '--amber',  glow: 'rgba(245,158,11,0.3)' },
  { key: 'totalCheckups',   label: 'Checkups',       icon: Stethoscope,color: '--purple', glow: 'rgba(168,85,247,0.3)' },
];

export default function Dashboard() {
  const [stats, setStats]           = useState({});
  const [recentPets, setRecentPets] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([getDashboard(), getAllPets()])
      .then(([s, p]) => { setStats(s.data); setRecentPets(p.data.slice(-6).reverse()); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="page"><div className="loader">
      <div className="loader-dot"/><div className="loader-dot"/><div className="loader-dot"/>
    </div></div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <span className="big">Health <em>Overview</em></span>
          <span className="sub">Real-time stats for all your pets</span>
        </div>
        <Link to="/pets" className="btn btn-primary">
          <PawPrint size={15}/> Manage Pets
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS_CONFIG.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.key} className="stat-card" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="glow" style={{ background: s.glow }}/>
              <div className="stat-icon-wrap" style={{ background: `color-mix(in srgb, var(${s.color}) 15%, transparent)` }}>
                <Icon size={18} style={{ color: `var(${s.color})` }} strokeWidth={2}/>
              </div>
              <div className="stat-value" style={{ color: `var(${s.color})` }}>
                <AnimatedNumber value={stats[s.key] ?? 0} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Pets */}
      <div className="pets-section-header" style={{ marginTop: 8 }}>
        <h2 className="section-title">Recently <em>Added</em></h2>
        <Link to="/pets" className="btn btn-ghost btn-sm">
          View All <ArrowRight size={13}/>
        </Link>
      </div>

      <div className="pets-grid">
        {recentPets.length === 0 ? (
          <div className="empty">
            <div className="empty-icon"><PawPrint size={36}/></div>
            <h3>No pets yet</h3>
            <p>Head to All Pets to add your first furry friend</p>
            <Link to="/pets" className="btn btn-primary"><PawPrint size={15}/> Add First Pet</Link>
          </div>
        ) : recentPets.map((pet, i) => (
          <MiniPetCard key={pet.id} pet={pet} delay={i * 0.06}/>
        ))}
      </div>
    </div>
  );
}

function MiniPetCard({ pet, delay }) {
  return (
    <div className="pet-card" style={{ animationDelay: `${delay}s` }}>
      <div className="pet-card-photo">
        {pet.photoUrl ? (
          <img src={pet.photoUrl} alt={pet.name} />
        ) : (
          <div className="pet-photo-placeholder">
            <span className="big-emoji">{emoji(pet.type)}</span>
          </div>
        )}
        <div className="pet-card-photo-badges">
          <span className={`badge ${pet.vaccinated === 'Yes' ? 'badge-success' : 'badge-danger'}`}>
            {pet.vaccinated === 'Yes' ? '✓ Vaccinated' : '✗ Unvaccinated'}
          </span>
          <span className={`badge ${pet.illness ? 'badge-warning' : 'badge-success'}`}>
            {pet.illness ? '⚠ Ill' : '♥ Healthy'}
          </span>
        </div>
      </div>
      <div className="pet-card-body">
        <div className="pet-card-top">
          <div>
            <div className="pet-name">{pet.name}</div>
            <div className="pet-type-label">{emoji(pet.type)} {pet.type}</div>
          </div>
        </div>
        <div className="pet-meta-grid">
          <div className="pet-meta-item"><div className="label">Age</div><div className="value">{pet.age} yrs</div></div>
          <div className="pet-meta-item"><div className="label">Checkups</div><div className="value">{pet.checkupCount}</div></div>
        </div>
      </div>
    </div>
  );
}
