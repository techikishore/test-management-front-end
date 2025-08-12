import React, { useState } from 'react';
import axios from 'axios';
import { Plus, HelpCircle, CheckCircle, AlertCircle, Edit3 } from 'lucide-react';

export default function AddQuestion({ testId, onAdded }) {
  const [q, setQ] = useState('');
  const [o1, setO1] = useState('');
  const [o2, setO2] = useState('');
  const [o3, setO3] = useState('');
  const [o4, setO4] = useState('');
  const [correct, setCorrect] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const clearForm = () => {
    setQ('');
    setO1('');
    setO2('');
    setO3('');
    setO4('');
    setCorrect('');
    setMsg('');
    setMsgType('');
  };

  const isFormValid =
    q.trim() &&
    o1.trim() &&
    o2.trim() &&
    o3.trim() &&
    o4.trim() &&
    correct.trim() &&
    [o1, o2, o3, o4].includes(correct.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setMsg('Please fill all fields and ensure correct answer matches one of the options.');
      setMsgType('error');
      return;
    }

    if (!testId) {
      setMsg('No test selected. Please create/select a test first.');
      setMsgType('error');
      return;
    }

    setLoading(true);
    setMsg('');
    setMsgType('');

    try {
      await axios.post('http://localhost:5001/api/questions', {
        testId,
        questionText: q.trim(),
        option1: o1.trim(),
        option2: o2.trim(),
        option3: o3.trim(),
        option4: o4.trim(),
        correctAnswer: correct.trim()
      });

      setMsg('Question added successfully!');
      setMsgType('success');
      clearForm();
      if (onAdded) onAdded();
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      setMsg(error.response?.data?.error || 'Failed to add question');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', borderTop: '3px dashed #e2e8f0', paddingTop: '20px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          cursor: 'pointer',
          border: '2px solid #e2e8f0',
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#cbd5e1';
          e.currentTarget.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <HelpCircle size={18} color="white" />
          </div>
          <div>
            <h5
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Add New Question
            </h5>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#64748b'
              }}
            >
              {isExpanded ? 'Click to collapse' : 'Click to expand and add a question'}
            </p>
          </div>
        </div>
        <div
          style={{
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: '#8b5cf6'
          }}
        >
          <Plus size={20} />
        </div>
      </div>

      {/* Form Content */}
      <div
        style={{
          maxHeight: isExpanded ? '800px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease'
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Question Input */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <Edit3 size={16} color="#8b5cf6" />
              Question Text <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              required
              placeholder="Enter your question here... (e.g., What is the capital of France?)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.2s ease',
                outline: 'none',
                resize: 'vertical',
                minHeight: '80px',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Options Grid */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Answer Options <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px'
              }}
            >
              {[
                { value: o1, setter: setO1, placeholder: 'Option A', label: 'A', color: '#ef4444' },
                { value: o2, setter: setO2, placeholder: 'Option B', label: 'B', color: '#f59e0b' },
                { value: o3, setter: setO3, placeholder: 'Option C', label: 'C', color: '#10b981' },
                { value: o4, setter: setO4, placeholder: 'Option D', label: 'D', color: '#3b82f6' }
              ].map((option, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '24px',
                      height: '24px',
                      background: option.color,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'white',
                      zIndex: 1
                    }}
                  >
                    {option.label}
                  </div>
                  <input
                    required
                    placeholder={option.placeholder}
                    value={option.value}
                    onChange={(e) => option.setter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = option.color;
                      e.target.style.boxShadow = `0 0 0 3px ${option.color}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <CheckCircle size={16} color="#10b981" />
              Correct Answer <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              required
              placeholder="Enter the exact text of the correct option"
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '12px',
                color: '#6b7280'
              }}
            >
              💡 Tip: Copy and paste the exact option text to avoid typos
            </p>
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
                color: msgType === 'success' ? '#166534' : '#dc2626'
              }}
            >
              {msgType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {msg}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={clearForm}
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
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
              }}
            >
              Clear Form
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                background:
                  loading || !isFormValid
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                boxShadow:
                  loading || !isFormValid ? 'none' : '0 4px 14px rgba(139, 92, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!loading && isFormValid) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && isFormValid) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(139, 92, 246, 0.4)';
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
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Question
                </>
              )}
            </button>
          </div>

          {/* Helper Text */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#64748b',
                lineHeight: '1.5'
              }}
            >
              <strong>Note:</strong> Make sure your correct answer exactly matches one of the
              four options. All fields are required to create a question.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
