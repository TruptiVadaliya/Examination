import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTest.css'; // Import your CSS file

const CreateTest = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionTest, setQuestionTest] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [corrent, setCorrent] = useState(0);

  const addQuestion = () => {
    setQuestions([...questions, { questionTest, options, corrent }]);
    setQuestionTest('');
    setOptions(['', '', '', '']);
    setCorrent(0);
  };

  const saveTest = () => {
    const tests = JSON.parse(localStorage.getItem('tests')) || [];
    const newTest = { id: Date.now(), title, questions };
    localStorage.setItem('tests', JSON.stringify([...tests, newTest]));
    alert('Test created!');
    navigate('/admin-dashboard');
  };

  return (
    <div className="create-test-container">
      <h3>Create New Test</h3>
      <input
        className="input-field"
        placeholder="Test Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="question-box">
        <input
          className="input-field"
          placeholder="Question"
          value={questionTest}
          onChange={e => setQuestionTest(e.target.value)}
        />

        {options.map((opt, idx) => (
          <input
            key={idx}
            className="input-field"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={e => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}

        <label>Correct Answer:</label>
        <select
          className="select-field"
          value={corrent}
          onChange={e => setCorrent(Number(e.target.value))}
        >
          <option value={0}>1</option>
          <option value={1}>2</option>
          <option value={2}>3</option>
          <option value={3}>4</option>
        </select>

        <div className="button-group">
          <button className="btn add" onClick={addQuestion}>Add Question</button>
          <button className="btn save" onClick={saveTest}>Save Test</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
