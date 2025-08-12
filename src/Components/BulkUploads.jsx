import React, { useState } from 'react';

export default function BulkUpload({ testId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function uploadCSV(testId, file) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { insertedCount: 25, errors: [] };
  }

  async function handleUpload() {
    if (!file) return setStatus('Please choose a CSV file');
    
    setIsUploading(true);
    setStatus('Uploading...');
    
    try {
      const res = await uploadCSV(testId, file);
      setStatus(`Successfully inserted ${res.insertedCount} questions. Errors: ${res.errors?.length || 0}`);
      if (onUploaded) onUploaded();
    } catch (err) {
      setStatus(err.response?.data?.error || err.message);
    } finally {
      setIsUploading(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setStatus('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const styles = {
    container: {
      marginTop: '32px',
      borderTop: '1px solid #e5e7eb',
      paddingTop: '32px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    header: {
      padding: '24px',
      paddingBottom: '0'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px'
    },
    iconContainer: {
      padding: '8px',
      backgroundColor: '#dbeafe',
      borderRadius: '8px'
    },
    icon: {
      width: '24px',
      height: '24px',
      color: '#2563eb'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      margin: '0'
    },
    subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0'
    },
    content: {
      padding: '0 24px 24px 24px'
    },
    dropZone: {
      position: 'relative',
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      padding: '32px',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      marginBottom: '24px'
    },
    dropZoneDragging: {
      borderColor: '#60a5fa',
      backgroundColor: '#dbeafe'
    },
    dropZoneWithFile: {
      borderColor: '#34d399',
      backgroundColor: '#d1fae5'
    },
    fileInput: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: '0',
      cursor: 'pointer'
    },
    dropContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    },
    uploadIcon: {
      width: '48px',
      height: '48px',
      color: file ? '#10b981' : '#9ca3af'
    },
    fileName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#065f46',
      margin: '0'
    },
    fileStatus: {
      fontSize: '12px',
      color: '#059669',
      margin: '0'
    },
    dropText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      margin: '0'
    },
    dropSubtext: {
      fontSize: '12px',
      color: '#6b7280',
      margin: '0'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    buttonEnabled: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    buttonDisabled: {
      backgroundColor: '#f3f4f6',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    buttonIcon: {
      width: '16px',
      height: '16px'
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid white',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    statusContainer: {
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px'
    },
    statusSuccess: {
      backgroundColor: '#d1fae5',
      border: '1px solid #a7f3d0'
    },
    statusError: {
      backgroundColor: '#fee2e2',
      border: '1px solid #fecaca'
    },
    statusUploading: {
      backgroundColor: '#dbeafe',
      border: '1px solid #bfdbfe'
    },
    statusIcon: {
      width: '20px',
      height: '20px'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '500',
      margin: '0'
    },
    statusTextSuccess: {
      color: '#065f46'
    },
    statusTextError: {
      color: '#991b1b'
    },
    statusTextUploading: {
      color: '#1e40af'
    },
    guide: {
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    guideHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    guideIcon: {
      width: '20px',
      height: '20px',
      color: '#2563eb',
      marginTop: '2px',
      flexShrink: '0'
    },
    guideTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 12px 0'
    },
    guideContent: {
      color: '#374151',
      fontSize: '14px'
    },
    guideExample: {
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '4px',
      border: '1px solid #e5e7eb',
      margin: '8px 0',
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#1f2937'
    },
    guideNotes: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '8px'
    }
  };

  const getStatusStyle = () => {
    if (status.includes('Successfully')) return { ...styles.statusContainer, ...styles.statusSuccess };
    if (status.includes('Error') || (status && !status.includes('Uploading'))) return { ...styles.statusContainer, ...styles.statusError };
    return { ...styles.statusContainer, ...styles.statusUploading };
  };

  const getStatusTextStyle = () => {
    if (status.includes('Successfully')) return { ...styles.statusText, ...styles.statusTextSuccess };
    if (status.includes('Error') || (status && !status.includes('Uploading'))) return { ...styles.statusText, ...styles.statusTextError };
    return { ...styles.statusText, ...styles.statusTextUploading };
  };

  const getDropZoneStyle = () => {
    let style = { ...styles.dropZone };
    if (isDragging) style = { ...style, ...styles.dropZoneDragging };
    else if (file) style = { ...style, ...styles.dropZoneWithFile };
    return style;
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 style={styles.title}>Bulk Upload Questions</h3>
              <p style={styles.subtitle}>Upload multiple questions using a CSV file</p>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          {/* Drag and Drop Area */}
          <div
            style={getDropZoneStyle()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              style={styles.fileInput}
              disabled={isUploading}
            />
            
            <div style={styles.dropContent}>
              <div>
                {file ? (
                  <svg style={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <svg style={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              
              {file ? (
                <div>
                  <p style={styles.fileName}>{file.name}</p>
                  <p style={styles.fileStatus}>Ready to upload</p>
                </div>
              ) : (
                <div>
                  <p style={styles.dropText}>Drop your CSV file here, or click to browse</p>
                  <p style={styles.dropSubtext}>Only CSV files are accepted</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div style={styles.buttonContainer}>
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              style={{
                ...styles.button,
                ...((!file || isUploading) ? styles.buttonDisabled : styles.buttonEnabled)
              }}
            >
              {isUploading ? (
                <>
                  <div style={styles.spinner}></div>
                  Uploading...
                </>
              ) : (
                <>
                  <svg style={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload CSV File
                </>
              )}
            </button>
          </div>

          {/* Status Message */}
          {status && (
            <div style={getStatusStyle()}>
              {status.includes('Successfully') ? (
                <svg style={{...styles.statusIcon, color: '#10b981'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : status.includes('Error') || (status && !status.includes('Uploading')) ? (
                <svg style={{...styles.statusIcon, color: '#ef4444'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : null}
              <span style={getStatusTextStyle()}>{status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}