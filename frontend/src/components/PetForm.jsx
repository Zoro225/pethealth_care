import { useState, useEffect, useRef } from 'react';
import { X, Upload, Camera, AlertTriangle, Syringe, User, Heart } from 'lucide-react';

const INITIAL = {
  name: '', age: '', type: 'Dog',
  illness: false, illnessDescription: '',
  vaccinated: 'Yes', checkupCount: 0, photoUrl: ''
};
const PET_TYPES = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Hamster', 'Other'];
const PET_EMOJI = { Dog:'🐶', Cat:'🐱', Rabbit:'🐰', Bird:'🐦', Fish:'🐠', Hamster:'🐹', Other:'🐾' };

export default function PetForm({ pet, onClose, onSave }) {
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    setForm(pet ? { ...INITIAL, ...pet } : INITIAL);
    setErrors({});
  }, [pet]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name = 'Name is required';
    if (form.age === '' || form.age < 0) e.age = 'Valid age required';
    if (form.illness && !form.illnessDescription.trim()) e.illnessDescription = 'Describe the illness';
    return e;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handlePhoto = file => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 3 * 1024 * 1024) { alert('Image must be under 3MB'); return; }
    const reader = new FileReader();
    reader.onload = e => setForm(p => ({ ...p, photoUrl: e.target.result }));
    reader.readAsDataURL(file);
  };

  const handleDrop = e => {
    e.preventDefault(); setDragging(false);
    handlePhoto(e.dataTransfer.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try { await onSave({ ...form, age: parseInt(form.age) }); }
    finally { setSaving(false); }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title">{pet ? 'Edit' : 'Add'} <em>Pet</em></div>
            <div className="modal-subtitle">{pet ? `Updating ${pet.name}'s record` : 'Register a new companion'}</div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={16}/></button>
        </div>
        <div className="modal-divider"/>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* Photo upload */}
            <div className="form-section">
              <div className="form-section-label"><Camera size={13}/> Pet Photo</div>
              <div
                className={`photo-upload-zone ${dragging ? 'drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }}
                  onChange={e => handlePhoto(e.target.files[0])} />

                {form.photoUrl ? (
                  <div className="photo-preview" style={{ position:'absolute', inset:0 }}>
                    <img src={form.photoUrl} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    <div className="photo-preview-overlay">
                      <span className="btn btn-ghost btn-sm"><Upload size={13}/> Change Photo</span>
                    </div>
                  </div>
                ) : (
                  <div className="photo-upload-placeholder">
                    <div className="icon-wrap"><Upload size={22} strokeWidth={1.5}/></div>
                    <p>Drop photo here or click to upload</p>
                    <span>JPG, PNG, WEBP · Max 3MB</span>
                  </div>
                )}
              </div>
              {form.photoUrl && (
                <button type="button" className="btn btn-ghost btn-sm"
                  style={{ marginTop: -12, marginBottom: 8 }}
                  onClick={() => setForm(p => ({ ...p, photoUrl: '' }))}>
                  <X size={12}/> Remove Photo
                </button>
              )}
            </div>

            {/* Basic info */}
            <div className="form-section">
              <div className="form-section-label"><User size={13}/> Basic Info</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Pet Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    className={`form-control ${errors.name ? 'error' : ''}`} placeholder="e.g. Max" />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Age (years) *</label>
                  <input name="age" type="number" min="0" value={form.age} onChange={handleChange}
                    className={`form-control ${errors.age ? 'error' : ''}`} placeholder="e.g. 3" />
                  {errors.age && <div className="form-error">{errors.age}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Pet Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="form-control">
                    {PET_TYPES.map(t => <option key={t}>{PET_EMOJI[t]} {t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Vaccinated</label>
                  <select name="vaccinated" value={form.vaccinated} onChange={handleChange} className="form-control">
                    <option value="Yes">✓ Yes — Vaccinated</option>
                    <option value="No">✗ No — Not Vaccinated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Health */}
            <div className="form-section">
              <div className="form-section-label"><Heart size={13}/> Health Status</div>
              <div
                className={`toggle-row ${form.illness ? 'on' : ''}`}
                onClick={() => setForm(p => ({ ...p, illness: !p.illness }))}
              >
                <div className="toggle-info">
                  <AlertTriangle size={18} color={form.illness ? 'var(--amber)' : 'var(--text-3)'}/>
                  <div>
                    <div className="toggle-text">Mark as ill</div>
                    <div className="toggle-sub">{form.illness ? 'Pet is currently unwell' : 'Pet is in good health'}</div>
                  </div>
                </div>
                <div className={`toggle-switch ${form.illness ? 'on' : ''}`}/>
              </div>

              {form.illness && (
                <div style={{ marginTop: 12, animation: 'fadeUp 0.2s ease' }}>
                  <label className="form-label">Illness Description *</label>
                  <textarea name="illnessDescription" value={form.illnessDescription}
                    onChange={handleChange} rows={3}
                    className={`form-control ${errors.illnessDescription ? 'error' : ''}`}
                    placeholder="Describe symptoms, diagnosis, medications..."/>
                  {errors.illnessDescription && <div className="form-error">{errors.illnessDescription}</div>}
                </div>
              )}
            </div>

          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ flex: 1 }}>
              {saving
                ? <><span className="loader-dot"/>&nbsp;Saving...</>
                : pet ? '✓ Update Pet' : '+ Add Pet'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
