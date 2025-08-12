import React from 'react';
import { LogOut, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{
      background: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BarChart3 size={20} color="white" />
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Manage your tests and content
            </p>
          </div>
        </div>

        {/* User + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: '500',
              color: '#1f2937'
            }}>
              {user.name}
            </p>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: '#6b7280'
            }}>
              {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#e5e7eb'; }}
            onMouseLeave={(e) => { e.target.style.background = '#f3f4f6'; }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
