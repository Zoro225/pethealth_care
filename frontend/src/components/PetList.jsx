import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Search, X, Edit3, Trash2, Stethoscope,
  Syringe, ShieldOff, Heart, AlertCircle, PawPrint,
  Filter, CheckCircle2
} from 'lucide-react';
import { getAllPets, addPet, updatePet, deletePet, searchPet } from '../api/petApi';
import PetForm from './PetForm';

const PET_EMOJI = { Dog:'🐶', Cat:'🐱', Rabbit:'🐰', Bird:'🐦', Fish:'🐠', Hamster:'🐹', Other:'🐾' };
const emoji = t => PET_EMOJI[t] || '🐾';

/* ── Toast ──────────────────────────────── */
function Toasts({ toasts }) {
  return (
    <div className="toasts">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="toast-icon">
            {t.type === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
          </span>
          <span className="toast-text">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Delete Confirm ─────────────────────── */
function DeleteModal({ pet, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="delete-modal">
        <div className="delete-icon-ring"><Trash2 size={28}/></div>
        <h3>Delete {pet.name}?</h3>
        <p>
          This will permanently remove <strong style={{ color:'var(--text-1)' }}>{pet.name}</strong> and all
          their health records. This action cannot be undone.
        </p>
        <div className="delete-modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}><Trash2 size={14}/> Delete</button>
          <button className="btn btn-ghost" onClick={onCancel}>Keep Pet</button>
        </div>
      </div>
    </div>
  );
}

/* ── Pet Card ───────────────────────────── */
function PetCard({ pet, onEdit, onDelete, delay }) {
  return (
    <div className="pet-card" style={{ animationDelay: `${delay}s` }}>
      {/* Photo */}
      <div className="pet-card-photo">
        {pet.photoUrl ? (
          <img src={pet.photoUrl} alt={pet.name}/>
        ) : (
          <div className="pet-photo-placeholder">
            <span className="big-emoji">{emoji(pet.type)}</span>
            <span>No photo</span>
          </div>
        )}
        <div className="pet-card-photo-badges">
          <span className={`badge ${pet.vaccinated === 'Yes' ? 'badge-success' : 'badge-danger'}`}>
            {pet.vaccinated === 'Yes'
              ? <><Syringe size={10}/> Vaccinated</>
              : <><ShieldOff size={10}/> Unvaccinated</>}
          </span>
          <span className={`badge ${pet.illness ? 'badge-warning' : 'badge-success'}`}>
            {pet.illness
              ? <><AlertCircle size={10}/> Ill</>
              : <><Heart size={10}/> Healthy</>}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="pet-card-body">
        <div className="pet-card-top">
          <div>
            <div className="pet-name">{pet.name}</div>
            <div className="pet-type-label">{emoji(pet.type)} {pet.type} · #{pet.id}</div>
          </div>
        </div>

        <div className="pet-meta-grid">
          <div className="pet-meta-item">
            <div className="label">Age</div>
            <div className="value">{pet.age} {pet.age === 1 ? 'year' : 'years'}</div>
          </div>
          <div className="pet-meta-item">
            <div className="label"><Stethoscope size={10} style={{display:'inline', marginRight:3}}/>Checkups</div>
            <div className="value">{pet.checkupCount}</div>
          </div>
        </div>

        {pet.illness && pet.illnessDescription && (
          <div className="illness-note">
            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }}/>
            <span>{pet.illnessDescription}</span>
          </div>
        )}

        <div className="pet-card-actions">
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => onEdit(pet)}>
            <Edit3 size={13}/> Edit
          </button>
          <button className="btn btn-danger btn-sm btn-icon" onClick={() => onDelete(pet)}>
            <Trash2 size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PET LIST
═══════════════════════════════════════════ */
const FILTERS = ['All', 'Healthy', 'Ill', 'Vaccinated', 'Unvaccinated'];

export default function PetList() {
  const [pets, setPets]           = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [query, setQuery]         = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showForm, setShowForm]   = useState(false);
  const [editPet, setEditPet]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts]       = useState([]);

  const toast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllPets();
      setPets(res.data);
    } catch { toast('Failed to load pets', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPets(); }, [fetchPets]);

  // Client-side filter
  useEffect(() => {
    let result = [...pets];
    if (activeFilter === 'Healthy')      result = result.filter(p => !p.illness);
    if (activeFilter === 'Ill')          result = result.filter(p => p.illness);
    if (activeFilter === 'Vaccinated')   result = result.filter(p => p.vaccinated === 'Yes');
    if (activeFilter === 'Unvaccinated') result = result.filter(p => p.vaccinated === 'No');
    if (query.trim()) result = result.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    setFiltered(result);
  }, [pets, activeFilter, query]);

  const handleSave = async data => {
    try {
      if (editPet) { await updatePet(editPet.id, data); toast(`${data.name} updated!`); }
      else         { await addPet(data);                 toast(`${data.name} added successfully!`); }
      setShowForm(false); setEditPet(null); fetchPets();
    } catch (err) {
      toast(err.response?.data?.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      await deletePet(deleteTarget.id);
      toast(`${deleteTarget.name} deleted`);
      setDeleteTarget(null); fetchPets();
    } catch { toast('Delete failed', 'error'); }
  };

  const openAdd  = ()    => { setEditPet(null); setShowForm(true); };
  const openEdit = pet   => { setEditPet(pet);  setShowForm(true); };

  return (
    <>
      <Toasts toasts={toasts} />

      {showForm && (
        <PetForm pet={editPet}
          onClose={() => { setShowForm(false); setEditPet(null); }}
          onSave={handleSave}/>
      )}

      {deleteTarget && (
        <DeleteModal pet={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}/>
      )}

      <div className="page">
        <div className="page-header">
          <div className="page-title">
            <span className="big">Your <em>Pets</em></span>
            <span className="sub">{pets.length} {pets.length === 1 ? 'companion' : 'companions'} in your care</span>
          </div>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={15}/> Add Pet
          </button>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <Search size={15} className="search-icon-pos"/>
            <input
              className="search-input"
              placeholder="Search by name..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')}
                style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-3)' }}>
                <X size={14}/>
              </button>
            )}
          </div>

          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button key={f}
                className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}>
                {f}
                {f === 'All' && pets.length > 0 && ` (${pets.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="loader">
            <div className="loader-dot"/><div className="loader-dot"/><div className="loader-dot"/>
          </div>
        ) : (
          <div className="pets-grid">
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon"><PawPrint size={36}/></div>
                <h3>{query || activeFilter !== 'All' ? 'No results found' : 'No pets yet'}</h3>
                <p>
                  {query ? `No pets match "${query}"` :
                   activeFilter !== 'All' ? `No ${activeFilter.toLowerCase()} pets found` :
                   'Add your first pet to get started'}
                </p>
                {!query && activeFilter === 'All' && (
                  <button className="btn btn-primary" onClick={openAdd}><Plus size={15}/> Add First Pet</button>
                )}
              </div>
            ) : filtered.map((pet, i) => (
              <PetCard
                key={pet.id} pet={pet}
                delay={i * 0.04}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
