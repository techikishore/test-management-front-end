import React from 'react';

export default function TestCard({ test }) {
  return (
    <details className="test-card">
      <summary className="test-summary">
        {test.title} — {test.questions?.length || 0} question(s)
      </summary>

      {test.description && (
        <p className="test-description">{test.description}</p>
      )}

      {test.questions?.length > 0 ? (
        <ol className="question-list">
          {test.questions.map((q) => (
            <li key={q._id || q.questionText} className="question-item">
              <div className="question-text"><b>{q.questionText}</b></div>
              <ul className="option-list">
                {q.options?.map((o, i) => (
                  <li key={`${q._id || q.questionText}-opt-${i}`}>
                    {String.fromCharCode(65 + i)}. {o}
                  </li>
                ))}
              </ul>
              <div className="correct-answer">
                Correct: <b>{q.correctAnswer}</b>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="no-questions">No questions added yet.</p>
      )}
    </details>
  );
}
