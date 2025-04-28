import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap!

const CreateTest = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionTest, setQuestionTest] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [corrent, setCorrent] = useState(0);

  const addQuestion = () => {
    if (!questionTest.trim() || options.some(opt => !opt.trim())) {
      alert('Please fill all question fields.');
      return;
    }
    setQuestions([...questions, { questionTest, options, corrent }]);
    setQuestionTest('');
    setOptions(['', '', '', '']);
    setCorrent(0);
  };

  const saveTest = () => {
    if (!title.trim() || questions.length === 0) {
      alert('Add a test title and at least one question.');
      return;
    }
    const tests = JSON.parse(localStorage.getItem('tests')) || [];
    const newTest = { id: Date.now(), title, questions };
    localStorage.setItem('tests', JSON.stringify([...tests, newTest]));
    alert('Test created!');
    navigate('/admin-dashboard');
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Create New Test</h3>

        {/* Test Title */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Test Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Question Input */}
        <div className="border p-3 mb-4">
          <h5 className="mb-3">Add Question</h5>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Question"
              value={questionTest}
              onChange={e => setQuestionTest(e.target.value)}
            />
          </div>

          {/* Options */}
          {options.map((opt, idx) => (
            <div className="mb-2" key={idx}>
              <input
                type="text"
                className="form-control"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={e => {
                  const newOptions = [...options];
                  newOptions[idx] = e.target.value;
                  setOptions(newOptions);
                }}
              />
            </div>
          ))}

          {/* Correct Answer */}
          <div className="mb-3">
            <label className="form-label">Correct Answer:</label>
            <select
              className="form-select"
              value={corrent}
              onChange={e => setCorrent(Number(e.target.value))}
            >
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
            </select>
          </div>

          {/* Button Group */}
          <div className="d-grid gap-2">
            <button className="btn btn-success" onClick={addQuestion}>
              ➕ Add Question
            </button>
          </div>
        </div>

        {/* List of Questions */}
        {questions.length > 0 && (
          <div className="mb-4">
            <h5>Questions Added:</h5>
            <ul className="list-group">
              {questions.map((q, idx) => (
                <li key={idx} className="list-group-item">
                  {idx + 1}. {q.questionTest}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Save Test */}
        <div className="d-grid gap-2">
          <button className="btn btn-primary" onClick={saveTest}>
            💾 Save Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
