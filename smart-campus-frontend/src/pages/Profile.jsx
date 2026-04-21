import { useNavigate } from 'react-router-dom';

const capitalize = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

function getInitials(name = '') {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const ROLE_TAG = { student: 'tag-blue', faculty: 'tag-green', admin: 'tag-yellow' };

export default function Profile() {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem('user') || '{}');

  const name       = user.name       || 'Unknown User';
  const userId     = user.userId     || '—';
  const role       = user.role       || 'student';
  const department = user.department || '—';

  function handleSignOut() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="view-enter" style={{ maxWidth: 500 }}>

      {/* ── PROFILE CARD ── */}
      <div className="table-card" style={{ padding: 28, marginBottom: 16 }}>

        {/* Avatar row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div
            className="user-avatar"
            style={{ width: 56, height: 56, fontSize: 22, borderRadius: 14 }}
          >
            {getInitials(name)}
          </div>
          <div>
            <div className="section-title" style={{ fontSize: 20 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 3 }}>{userId}</div>
            <span
              className={`tag ${ROLE_TAG[role] ?? 'tag-blue'}`}
              style={{ marginTop: 8, display: 'inline-flex' }}
            >
              {capitalize(role)}
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="room-detail-grid">
          <div className="detail-item">
            <div className="detail-lbl">Full Name</div>
            <div className="detail-val">{name}</div>
          </div>
          <div className="detail-item">
            <div className="detail-lbl">User ID</div>
            <div className="detail-val" style={{ fontSize: 12, wordBreak: 'break-all' }}>
              {userId}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-lbl">Role</div>
            <div className="detail-val">{capitalize(role)}</div>
          </div>
          <div className="detail-item">
            <div className="detail-lbl">Department</div>
            <div className="detail-val">{department}</div>
          </div>
        </div>
      </div>

      {/* ── SIGN OUT ── */}
      <button
        onClick={handleSignOut}
        style={{
          width:       '100%',
          background:  'var(--surface)',
          border:      '1px solid var(--border)',
          borderRadius: 12,
          padding:     14,
          color:       'var(--red)',
          fontFamily:  "'DM Sans', sans-serif",
          fontWeight:  600,
          fontSize:    15,
          cursor:      'pointer',
          transition:  'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,82,102,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
      >
        ⏻ Sign Out
      </button>
    </div>
  );
}