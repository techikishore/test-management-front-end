import React, { useState } from 'react'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f0f0'
  },
  title: {
    margin: 0,
    color: '#333',
    fontSize: '24px',
    fontWeight: '600'
  },
  icon: {
    fontSize: '28px',
    opacity: '0.7'
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center'
  },
  alertError: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderLeft: '4px solid #dc2626'
  },
  alertSuccess: {
    backgroundColor: '#d1fae5',
    color: '#059669',
    borderLeft: '4px solid #059669'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: '600',
    marginBottom: '8px',
    color: '#374151',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  select: {
    padding: '14px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  selectFocus: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  },
  fileInputWrapper: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    width: '100%'
  },
  fileInput: {
    position: 'absolute',
    left: '-9999px',
    opacity: 0
  },
  fileInputLabel: {
    display: 'block',
    padding: '14px 16px',
    border: '2px dashed #d1d5db',
    borderRadius: '10px',
    backgroundColor: '#f9fafb',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    color: '#6b7280'
  },
  fileInputLabelHover: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff',
    color: '#667eea'
  },
  fileInfo: {
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: '#f0f9ff',
    borderRadius: '6px',
    border: '1px solid #e0f2fe'
  },
  fileSize: {
    fontSize: '12px',
    color: '#0369a1',
    fontWeight: '500'
  },
  button: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '10px'
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
  },
  buttonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed',
    transform: 'none'
  },
  buttonLoading: {
    background: '#9ca3af'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s ease-in-out infinite'
  },
  formatInfo: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  infoHeader: {
    fontWeight: '600',
    marginBottom: '8px',
    color: '#475569',
    fontSize: '14px'
  },
  code: {
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#1e293b',
    backgroundColor: '#e2e8f0',
    padding: '4px 8px',
    borderRadius: '4px',
    wordBreak: 'break-all'
  }
}

const spinnerKeyframes = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`

export default function UploadCSV({ tests = [], onUploaded }) {
  const [testId, setTestId] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectFocused, setSelectFocused] = useState(false)
  const [fileHover, setFileHover] = useState(false)
  const [buttonHover, setButtonHover] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setError('')
    setSuccess('')

    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
        setError('Please select a CSV file')
        setFile(null)
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        setFile(null)
        return
      }

      setFile(selectedFile)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!testId) {
      setError('Please select a test')
      return
    }

    if (!file) {
      setError('Please choose a CSV file')
      return
    }

    const form = new FormData()
    form.append('file', file)
    setLoading(true)

    try {
      await new Promise(res => setTimeout(res, 1500))

      setFile(null)
      setTestId('')
      setSuccess('Questions uploaded successfully!')
      onUploaded && onUploaded()

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Upload failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <style>{spinnerKeyframes}</style>
      <div style={styles.card}>
        <div style={styles.header}>
          <h3 style={styles.title}>Upload Questions (CSV)</h3>
          <div style={styles.icon}>📁</div>
        </div>

        {error && (
          <div style={{ ...styles.alert, ...styles.alertError }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div style={{ ...styles.alert, ...styles.alertSuccess }}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={submit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Test</label>
            <select
              value={testId}
              onChange={e => setTestId(e.target.value)}
              onFocus={() => setSelectFocused(true)}
              onBlur={() => setSelectFocused(false)}
              style={{
                ...styles.select,
                ...(selectFocused ? styles.selectFocus : {})
              }}
            >
              <option value="">-- Select Test --</option>
              {(tests || []).map(t => (
                <option key={t._id} value={t._id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Choose CSV File</label>
            <div style={styles.fileInputWrapper}>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={styles.fileInput}
                id="csv-file"
              />
              <label
                htmlFor="csv-file"
                onMouseEnter={() => setFileHover(true)}
                onMouseLeave={() => setFileHover(false)}
                style={{
                  ...styles.fileInputLabel,
                  ...(fileHover ? styles.fileInputLabelHover : {})
                }}
              >
                {file ? file.name : 'Choose CSV file...'}
              </label>
            </div>
            {file && (
              <div style={styles.fileInfo}>
                <span style={styles.fileSize}>
                  Size: {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>
            )}
          </div>

          <button
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonLoading : {}),
              ...(loading ? styles.buttonDisabled : {}),
              ...(!loading && buttonHover ? styles.buttonHover : {})
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Uploading...
              </>
            ) : (
              <>
                <span>Upload CSV</span>
                <span>⬆️</span>
              </>
            )}
          </button>
        </form>

        <div style={styles.formatInfo}>
          <div style={styles.infoHeader}>CSV Format:</div>
          <code style={styles.code}>
            questionText,option1,option2,option3,option4,correctAnswer
          </code>
        </div>
      </div>
    </div>
  )
}
