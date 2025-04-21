import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TakeTest.css';

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
    <div>
      <h3>{test.title} - Time Left: {timeLeft}s</h3>
      <p><strong>Q{currentQ + 1}:</strong> {q.questionText}</p>
      {
        q.options.map((opt, idx) => (
          <div key={idx}>
            <input
              type="radio"
              name={`question-${currentQ}`}
              checked={answers[currentQ] === idx}
              onChange={() => selectAnswer(idx)}
            />
            <label>{opt}</label>
          </div>
        ))
      }
      <div style={{ marginTop: '20px' }}>
        <button onClick={prev} disabled={currentQ === 0}>Previous</button>
        <button onClick={next} disabled={currentQ === test.questions.length - 1}>Next</button>
        <button onClick={submitTest}>Submit</button>
      </div>
    </div>
  );
};

export default TakeTest;
