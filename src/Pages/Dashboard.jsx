import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, HelpCircle, Eye, Upload } from 'lucide-react';
import CreateTest from './CreateTest';
import AddQuestion from './AddQuestion';
import BulkUpload from '../Components/BulkUploads';
import ViewTests from './ViewTests';
import Header from '../Components/Navbar';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('');
  const [currentTestId, setCurrentTestId] = useState(null); 
  const [user] = useState({ name: 'Admin User', email: 'admin@example.com' });

  const [loadingTests, setLoadingTests] = useState(false);
  const [errorTests, setErrorTests] = useState(null);
  const [tests, setTests] = useState([]);

  async function fetchTests() {
    setLoadingTests(true);
    setErrorTests(null);
    try {
      const response = await axios.get('/api/tests'); 
      setTests(response.data);
    } catch (error) {
      setErrorTests(error.message || 'Failed to load tests');
    } finally {
      setLoadingTests(false);
    }
  }

  useEffect(() => {
    fetchTests();
  }, []);

  const handleLogout = () => {
    alert('Logout clicked!');
  };

  const buttons = [
    {
      id: 'create-test',
      title: 'Create Test',
      icon: Plus,
      color: '#10b981',
      bgColor: '#10b98115',
      disabled: false
    },
    {
      id: 'add-question',
      title: 'Add Question',
      icon: HelpCircle,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      disabled: !currentTestId
    },
    {
      id: 'view-tests',
      title: 'View Test List',
      icon: Eye,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      disabled: false
    },
    {
      id: 'bulk-upload',
      title: 'Bulk Upload via CSV',
      icon: Upload,
      color: '#ef4444',
      bgColor: '#ef444415',
      disabled: false
    }
  ];

  const handleTestCreated = (newTest) => {
    setCurrentTestId(newTest._id);
    setActiveSection('add-question');
    fetchTests(); 
  };

  const handleQuestionAdded = () => {
    fetchTests();
  };


  const renderContent = () => {
    if (loadingTests) return <p>Loading tests...</p>;
    if (errorTests) return <p style={{ color: 'red' }}>{errorTests}</p>;

    switch (activeSection) {
      case 'create-test':
        return (
          <div style={contentStyle}>
            <CreateTest onCreated={handleTestCreated} />
          </div>
        );
      case 'add-question':
        if (!currentTestId) {
          return <p>Please create or select a test first.</p>;
        }
        return (
          <div style={contentStyle}>
            <AddQuestion testId={currentTestId} onAdded={handleQuestionAdded} />
          </div>
        );
      case 'view-tests':
        return (
          <div style={contentStyle}>
            <ViewTests tests={tests} />
          </div>
        );
      case 'bulk-upload':
        return (
          <div style={contentStyle}>
            <BulkUpload onCreated={handleTestCreated} />
          </div>
        );
      default:
        return <p>Please select an action.</p>;
    }
  };

  const contentStyle = {
    background: 'white',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    marginTop: '24px'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <Header user={user} onLogout={handleLogout} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 2fr))',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                if (!button.disabled) setActiveSection(button.id);
              }}
              disabled={button.disabled}
              style={{
                background:
                  activeSection === button.id
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.9)',
                padding: '32px 24px',
                borderRadius: '20px',
                border:
                  activeSection === button.id
                    ? `3px solid ${button.color}`
                    : '3px solid transparent',
                boxShadow:
                  activeSection === button.id
                    ? `0 20px 40px -10px ${button.color}40`
                    : '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                cursor: button.disabled ? 'not-allowed' : 'pointer',
                opacity: button.disabled ? 0.6 : 1,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform:
                  activeSection === button.id
                    ? 'translateY(-8px) scale(1.02)'
                    : 'translateY(0) scale(1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  background:
                    activeSection === button.id
                      ? `linear-gradient(135deg, ${button.color}, ${button.color}dd)`
                      : button.bgColor,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <button.icon
                  size={32}
                  color={activeSection === button.id ? 'white' : button.color}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color:
                      activeSection === button.id
                        ? button.color
                        : '#1f2937'
                  }}
                >
                  {button.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#6b7280',
                    opacity: 0.8
                  }}
                >
                  Click to {button.title.toLowerCase()}
                </p>
              </div>
            </button>
          ))}
        </div>

        {renderContent()}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        button:active {
          transform: scale(0.98) !important;
        }
      `}</style>
    </div>
  );
}
