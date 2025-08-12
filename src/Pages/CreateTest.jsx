import React, { useState } from 'react';
import { Plus, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


export default function CreateTest({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  async function createTest(title, description) {
    try {
      const response = await axios.post(`${API_URL}/api/tests`, {
        title,
        description,
      });
      return response.data; 
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to create test';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setMsg('Test title is required.');
      setMsgType('error');
      return;
    }

    setLoading(true);
    setMsg('');
    setMsgType('');

    try {
      const createdTest = await createTest(title.trim(), description.trim());
      setMsg('Test created successfully!');
      setMsgType('success');
      setTitle('');
      setDescription('');
      setIsExpanded(false);

      if (onCreated) onCreated(createdTest); 

      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      setMsg(typeof error === 'string' ? error : 'Failed to create test');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '2px solid #e2e8f0',
        borderRadius: '16px',
        marginBottom: '24px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: isExpanded
          ? '0 10px 25px rgba(0, 0, 0, 0.1)'
          : '0 4px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={20} />
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Create New Test
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                opacity: 0.9,
              }}
            >
              {isExpanded ? 'Click to collapse' : 'Click to expand and create a test'}
            </p>
          </div>
        </div>
        <div
          style={{
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Plus size={20} />
        </div>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxHeight: isExpanded ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div style={{ padding: '24px' }}>
          {/* Test Information Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              padding: '16px',
              background: '#f1f5f9',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            }}
          >
            <FileText size={20} color="#64748b" />
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#334155',
                }}
              >
                Test Information
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: '#64748b',
                }}
              >
                Fill in the details for your new test
              </p>
            </div>
          </div>

          {/* Title Input */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Test Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              required
              placeholder="Enter test title (e.g., Math Quiz, Science Test)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Description Input */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Description{' '}
              <span style={{ fontSize: '12px', fontWeight: '400', color: '#6b7280' }}>
                (Optional)
              </span>
            </label>
            <textarea
              placeholder="Provide a brief description of the test..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.2s ease',
                outline: 'none',
                resize: 'vertical',
                minHeight: '80px',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Message Display */}
          {msg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '20px',
                background: msgType === 'success' ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${msgType === 'success' ? '#bbf7d0' : '#fecaca'}`,
                color: msgType === 'success' ? '#166534' : '#dc2626',
              }}
            >
              {msgType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                {msg}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setTitle('');
                setDescription('');
                setMsg('');
                setIsExpanded(false);
              }}
              style={{
                padding: '10px 20px',
                background: '#f8fafc',
                color: '#64748b',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f8fafc';
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !title.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                background:
                  loading || !title.trim()
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading || !title.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                boxShadow: loading || !title.trim() ? 'none' : '0 4px 14px rgba(16, 185, 129, 0.4)',
              }}
              onMouseEnter={(e) => {
                if (!loading && title.trim()) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && title.trim()) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.4)';
                }
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Create Test
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
