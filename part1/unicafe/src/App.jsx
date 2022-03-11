import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const { good, neutral, bad } = feedback;
  const getTotalFeedback = () => good + neutral + bad;

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setFeedback({ ...feedback, good: good + 1 })}>
        good
      </button>
      <button
        onClick={() => setFeedback({ ...feedback, neutral: neutral + 1 })}
      >
        neutral
      </button>
      <button onClick={() => setFeedback({ ...feedback, bad: bad + 1 })}>
        bad
      </button>
      <h2>stadistics</h2>
      <Statistics {...feedback} getTotalFeedback={getTotalFeedback} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad, getTotalFeedback }) => {
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {getTotalFeedback()}</p>
      <p>average {getTotalFeedback() / 3}</p>
      <p>positive {(good * 100) / getTotalFeedback()} %</p>
    </>
  );
};

export default App;
