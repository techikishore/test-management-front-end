import React, { useState } from 'react';
import AddQuestion from '../Pages/AddQuestion';
import BulkUpload from './BulkUploads';

export default function TestList({ tests, refreshTests }) {
  const [expandedId, setExpandedId] = useState(null);
  const [testDetail, setTestDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleExpand(testId) {
    if (expandedId === testId) {
      setExpandedId(null);
      setTestDetail(null);
      return;
    }
    setLoading(true);
    try {
      const res = await getTest(testId);
      if (res.success) {
        setTestDetail(res.test);
        setExpandedId(testId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {tests.length === 0 && <div>No tests yet</div>}
      {tests.map(t => (
        <div key={t._id} style={{border:'1px solid #eee', padding:8, marginBottom:8}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <strong>{t.title}</strong><div style={{fontSize:12, color:'#666'}}>{t.description}</div>
            </div>
            <div>
              <button onClick={()=>handleExpand(t._id)}>{expandedId === t._1d ? 'Hide' : 'Expand'}</button>
            </div>
          </div>

          {expandedId === t._id && (
            <div style={{marginTop:8}}>
              {loading && <div>Loading...</div>}
              {!loading && testDetail && <>
                <h4>Questions ({testDetail.questions?.length || 0})</h4>
                <ol>
                  {testDetail.questions?.map(q => (
                    <li key={q._id} style={{marginBottom:6}}>
                      <div>{q.questionText}</div>
                      <div style={{fontSize:13, color:'#333'}}>A. {q.options?.a} | B. {q.options?.b} | C. {q.options?.c} | D. {q.options?.d}</div>
                      <div style={{fontSize:12, color:'green'}}>Correct: {q.correctAnswer}</div>
                    </li>
                  ))}
                </ol>

                <AddQuestion testId={t._id} onAdded={() => { handleExpand(t._id); if (refreshTests) refreshTests(); }} />
                <BulkUpload testId={t._id} onUploaded={() => { handleExpand(t._id); if (refreshTests) refreshTests(); }} />
              </>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
