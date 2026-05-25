import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const BASE_URL = 'http://localhost:5001';

const AboutUs = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [about, setAbout]         = useState(null);
  const [success, setSuccess]     = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const [infoForm, setInfoForm] = useState({
    hotelName: '', tagline: '', story: '', mission: '', vision: '',
    yearsOfExperience: 0, totalRooms: 0, guestsServed: 0, staffMembers: 0,
  });

  const [showAddTeam, setShowAddTeam]       = useState(false);
  const [showEditTeam, setShowEditTeam]     = useState(false);
  const [showDeleteTeam, setShowDeleteTeam] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamForm, setTeamForm]   = useState({ name: '', designation: '', bio: '' });
  const [teamImage, setTeamImage] = useState(null);
  const [teamPreview, setTeamPreview] = useState('');
  const [teamError, setTeamError] = useState('');

  useEffect(() => { loadAbout(); }, []);

  const loadAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/about`, { headers });
      setAbout(res.data);
      setInfoForm({
        hotelName:         res.data.hotelName         || '',
        tagline:           res.data.tagline           || '',
        story:             res.data.story             || '',
        mission:           res.data.mission           || '',
        vision:            res.data.vision            || '',
        yearsOfExperience: res.data.yearsOfExperience || 0,
        totalRooms:        res.data.totalRooms        || 0,
        guestsServed:      res.data.guestsServed      || 0,
        staffMembers:      res.data.staffMembers      || 0,
      });
    } catch (err) { console.error(err); }
  };

  const showMsg = (msg, isError = false) => {
    if (isError) { setError(msg); setSuccess(''); }
    else { setSuccess(msg); setError(''); }
    setTimeout(() => { setSuccess(''); setError(''); }, 3000);
  };

  const handleSaveInfo = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/about`, infoForm, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
      showMsg('About Us saved successfully!');
      loadAbout();
    } catch (err) { showMsg(err.response?.data?.message || 'Failed to save.', true); }
    setLoading(false);
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${BASE_URL}${image}`;
  };

  const handleTeamImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setTeamImage(file);
    setTeamPreview(URL.createObjectURL(file));
  };

  const buildTeamFD = () => {
    const fd = new FormData();
    fd.append('name',        teamForm.name);
    fd.append('designation', teamForm.designation);
    fd.append('bio',         teamForm.bio);
    if (teamImage) fd.append('image', teamImage);
    return fd;
  };

  const handleAddTeam = async () => {
    setTeamError('');
    if (!teamForm.name || !teamForm.designation) { setTeamError('Name and designation are required.'); return; }
    try {
      await axios.post(`${API_URL}/about/team`, buildTeamFD(), { headers });
      setShowAddTeam(false);
      resetTeamForm();
      loadAbout();
    } catch (err) { setTeamError(err.response?.data?.message || 'Failed to add.'); }
  };

  const handleEditTeam = async () => {
    setTeamError('');
    if (!teamForm.name || !teamForm.designation) { setTeamError('Name and designation are required.'); return; }
    try {
      await axios.put(`${API_URL}/about/team/${selectedMember._id}`, buildTeamFD(), { headers });
      setShowEditTeam(false);
      resetTeamForm();
      loadAbout();
    } catch (err) { setTeamError(err.response?.data?.message || 'Failed to update.'); }
  };

  const handleDeleteTeam = async () => {
    try {
      await axios.delete(`${API_URL}/about/team/${selectedMember._id}`, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
      setShowDeleteTeam(false);
      loadAbout();
    } catch (err) { console.error(err); }
  };

  const openEditTeam = (member) => {
    setSelectedMember(member);
    setTeamForm({ name: member.name, designation: member.designation, bio: member.bio || '' });
    setTeamImage(null);
    setTeamPreview(getImageSrc(member.image) || '');
    setTeamError('');
    setShowEditTeam(true);
  };

  const resetTeamForm = () => {
    setTeamForm({ name: '', designation: '', bio: '' });
    setTeamImage(null);
    setTeamPreview('');
    setTeamError('');
  };

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">About Us Management</h4>
          </div>
        </div>
      </div>

      {success && <div className="alert alert-success"><i className="ri-check-line me-2"></i>{success}</div>}
      {error   && <div className="alert alert-danger"><i className="ri-error-warning-line me-2"></i>{error}</div>}

      {/* Stats Cards */}
      <div className="row mb-3">
        {[
          { label: 'Team Members',      value: about?.team?.length || 0,    icon: 'ri-team-line',          color: 'primary' },
          { label: 'Years Experience',  value: infoForm.yearsOfExperience,  icon: 'ri-trophy-line',        color: 'warning' },
          { label: 'Guests Served',     value: infoForm.guestsServed,       icon: 'ri-user-smile-line',    color: 'success' },
          { label: 'Total Rooms',       value: infoForm.totalRooms,         icon: 'ri-hotel-bed-line',     color: 'info'    },
        ].map((s, i) => (
          <div className="col-md-3 col-6" key={i}>
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className={`avatar-title bg-${s.color}-subtle rounded fs-3`}>
                      <i className={`${s.icon} text-${s.color}`}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-medium text-muted mb-1 fs-12">{s.label}</p>
                    <h4 className="mb-0 fw-semibold">{s.value}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0">
            {[
              { key: 'info',  label: 'Hotel Info & Story', icon: 'ri-building-line'  },
              { key: 'stats', label: 'Stats',              icon: 'ri-bar-chart-line' },
              { key: 'team',  label: 'Team Members',       icon: 'ri-team-line'      },
            ].map(tab => (
              <li className="nav-item" key={tab.key}>
                <button className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}>
                  <i className={`${tab.icon} me-1`}></i>{tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-body">

          {/* ── INFO TAB ── */}
          {activeTab === 'info' && (
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Hotel Name</label>
                <input className="form-control" value={infoForm.hotelName}
                  onChange={e => setInfoForm({ ...infoForm, hotelName: e.target.value })}
                  placeholder="e.g. The Luxury Stay" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tagline</label>
                <input className="form-control" value={infoForm.tagline}
                  onChange={e => setInfoForm({ ...infoForm, tagline: e.target.value })}
                  placeholder="e.g. Where Comfort Meets Excellence" />
              </div>
              <div className="col-12">
                <label className="form-label">Our Story / History</label>
                <textarea className="form-control" rows={5} value={infoForm.story}
                  onChange={e => setInfoForm({ ...infoForm, story: e.target.value })}
                  placeholder="Tell guests about your hotel's history and journey..." />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mission</label>
                <textarea className="form-control" rows={4} value={infoForm.mission}
                  onChange={e => setInfoForm({ ...infoForm, mission: e.target.value })}
                  placeholder="Our mission is to..." />
              </div>
              <div className="col-md-6">
                <label className="form-label">Vision</label>
                <textarea className="form-control" rows={4} value={infoForm.vision}
                  onChange={e => setInfoForm({ ...infoForm, vision: e.target.value })}
                  placeholder="Our vision is to..." />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-primary" onClick={handleSaveInfo} disabled={loading}>
                  <i className="ri-save-line me-1"></i>{loading ? 'Saving...' : 'Save Info'}
                </button>
              </div>
            </div>
          )}

          {/* ── STATS TAB ── */}
          {activeTab === 'stats' && (
            <div>
              <div className="row g-3 mb-4">
                {[
                  { label: 'Years of Experience', key: 'yearsOfExperience', icon: '🏆', color: 'warning' },
                  { label: 'Total Rooms',         key: 'totalRooms',        icon: '🛏️', color: 'primary' },
                  { label: 'Guests Served',       key: 'guestsServed',      icon: '👥', color: 'success' },
                  { label: 'Staff Members',       key: 'staffMembers',      icon: '👨‍💼', color: 'info'    },
                ].map(stat => (
                  <div className="col-md-6" key={stat.key}>
                    <div className={`p-3 bg-${stat.color}-subtle rounded`}>
                      <label className="form-label fw-semibold">
                        {stat.icon} {stat.label}
                      </label>
                      <input type="number" className="form-control" min="0"
                        value={infoForm[stat.key]}
                        onChange={e => setInfoForm({ ...infoForm, [stat.key]: Number(e.target.value) })} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Preview */}
              <div className="p-3 bg-light rounded mb-4">
                <p className="text-muted fs-12 mb-3 fw-semibold">PREVIEW — User website pe aisa dikhega:</p>
                <div className="row g-3 text-center">
                  {[
                    { label: 'Years Experience', value: infoForm.yearsOfExperience, suffix: '+' },
                    { label: 'Rooms',            value: infoForm.totalRooms,        suffix: ''  },
                    { label: 'Happy Guests',     value: infoForm.guestsServed,      suffix: '+' },
                    { label: 'Staff Members',    value: infoForm.staffMembers,      suffix: '+' },
                  ].map((s, i) => (
                    <div className="col-3" key={i}>
                      <h2 className="fw-bold text-primary mb-0">{s.value}{s.suffix}</h2>
                      <small className="text-muted">{s.label}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-end">
                <button className="btn btn-success" onClick={handleSaveInfo} disabled={loading}>
                  <i className="ri-save-line me-1"></i>{loading ? 'Saving...' : 'Save Stats'}
                </button>
              </div>
            </div>
          )}

          {/* ── TEAM TAB ── */}
          {activeTab === 'team' && (
            <div>
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-success" onClick={() => { resetTeamForm(); setShowAddTeam(true); }}>
                  <i className="ri-add-line me-1"></i>Add Team Member
                </button>
              </div>

              {(!about?.team || about.team.length === 0) ? (
                <div className="text-center py-5 text-muted">
                  <i className="ri-team-line fs-1 d-block mb-2 opacity-25"></i>
                  No team members yet. Click "Add Team Member" to get started.
                </div>
              ) : (
                <div className="row g-3">
                  {about.team.map(member => (
                    <div className="col-xl-3 col-md-4 col-sm-6" key={member._id}>
                      <div className="card border h-100 text-center">
                        <div className="card-body p-3">
                          {getImageSrc(member.image) ? (
                            <img src={getImageSrc(member.image)} alt={member.name}
                              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
                          ) : (
                            <div style={{
                              width: 80, height: 80, borderRadius: '50%',
                              background: '#405189', color: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 28, fontWeight: 700, margin: '0 auto 12px'
                            }}>
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <h6 className="fw-semibold mb-1">{member.name}</h6>
                          <p className="text-primary fs-12 mb-2">{member.designation}</p>
                          {member.bio && (
                            <p className="text-muted fs-12 mb-3" style={{
                              display: '-webkit-box', WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4
                            }}>
                              {member.bio}
                            </p>
                          )}
                        </div>
                        <div className="card-footer bg-white p-2 d-flex gap-2 justify-content-center">
                          <button className="btn btn-soft-primary btn-sm" onClick={() => openEditTeam(member)}>
                            <i className="ri-pencil-line me-1"></i>Edit
                          </button>
                          <button className="btn btn-soft-danger btn-sm"
                            onClick={() => { setSelectedMember(member); setShowDeleteTeam(true); }}>
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── ADD TEAM MODAL ── */}
      {showAddTeam && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Team Member</h5>
                <button className="btn-close" onClick={() => { setShowAddTeam(false); resetTeamForm(); }}></button>
              </div>
              <div className="modal-body">
                {teamError && <div className="alert alert-danger">{teamError}</div>}
                <TeamForm form={teamForm} setForm={setTeamForm} preview={teamPreview} onImageChange={handleTeamImageChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => { setShowAddTeam(false); resetTeamForm(); }}>Cancel</button>
                <button className="btn btn-success" onClick={handleAddTeam}>
                  <i className="ri-check-line me-1"></i>Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT TEAM MODAL ── */}
      {showEditTeam && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Team Member</h5>
                <button className="btn-close" onClick={() => { setShowEditTeam(false); resetTeamForm(); }}></button>
              </div>
              <div className="modal-body">
                {teamError && <div className="alert alert-danger">{teamError}</div>}
                <TeamForm form={teamForm} setForm={setTeamForm} preview={teamPreview} onImageChange={handleTeamImageChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => { setShowEditTeam(false); resetTeamForm(); }}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEditTeam}>
                  <i className="ri-check-line me-1"></i>Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE TEAM MODAL ── */}
      {showDeleteTeam && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <div className="avatar-md mx-auto mb-3">
                  <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                    <i className="ri-delete-bin-line text-danger"></i>
                  </span>
                </div>
                <h5>Remove Team Member?</h5>
                <p className="text-muted">{selectedMember?.name}</p>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button className="btn btn-light" onClick={() => setShowDeleteTeam(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleDeleteTeam}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TeamForm = ({ form, setForm, preview, onImageChange }) => (
  <div className="row g-3">
    <div className="col-12">
      <label className="form-label">Full Name <span className="text-danger">*</span></label>
      <input className="form-control" placeholder="e.g. Ahmed Khan"
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
    </div>
    <div className="col-12">
      <label className="form-label">Designation <span className="text-danger">*</span></label>
      <input className="form-control" placeholder="e.g. General Manager"
        value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
    </div>
    <div className="col-12">
      <label className="form-label">Short Bio</label>
      <textarea className="form-control" rows={3}
        placeholder="Brief description..."
        value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
    </div>
    <div className="col-12">
      <label className="form-label">Photo</label>
      <input type="file" className="form-control" accept="image/*" onChange={onImageChange} />
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="preview"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #dee2e6' }} />
        </div>
      )}
    </div>
  </div>
);

export default AboutUs;