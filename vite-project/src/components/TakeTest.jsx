import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TakeTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = (JSON.parse(localStorage.getItem('tests')) || []).find(t => t.id === id);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const selectAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (currentQ < test.questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const submitTest = () => {
    const score = test.questions.reduce((acc, q, i) => {
      return acc + (q.correct === answers[i] ? 1 : 0);
    }, 0);

    const results = JSON.parse(localStorage.getItem('results')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    results.push({
      userEmail: currentUser.email,
      testId: test.id,
      score
    });

    localStorage.setItem('results', JSON.stringify(results));
    navigate(`/result/${test.id}`);
  };

  const q = test?.questions?.[currentQ];

  if (!test || !q) {
    return <p>Loading test or invalid test ID...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3>{test.title} - Time Left: <span className="text-danger">{timeLeft}s</span></h3>
        <p><strong>Q{currentQ + 1}:</strong> {q.questionText}</p>
        {
          q.options.map((opt, idx) => (
            <div key={idx} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${currentQ}`}
                checked={answers[currentQ] === idx}
                onChange={() => selectAnswer(idx)}
              />
              <label className="form-check-label">{opt}</label>
            </div>
          ))
        }
        <div className="mt-3 d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={prev} disabled={currentQ === 0}>Previous</button>
          <div>
            <button className="btn btn-primary" onClick={next} disabled={currentQ === test.questions.length - 1}>Next</button>
            <button className="btn btn-success ms-2" onClick={submitTest}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
