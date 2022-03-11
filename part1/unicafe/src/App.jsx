import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const { good, neutral, bad } = feedback;
  const getTotalFeedback = () => good + neutral + bad;

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setFeedback({ ...feedback, good: good + 1 })}>
        good
      </Button>
      <Button
        onClick={() => setFeedback({ ...feedback, neutral: neutral + 1 })}
      >
        neutral
      </Button>
      <Button onClick={() => setFeedback({ ...feedback, bad: bad + 1 })}>
        bad
      </Button>
      <h2>stadistics</h2>
      {getTotalFeedback() === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics {...feedback} getTotalFeedback={getTotalFeedback} />
      )}
    </div>
  );
};

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const Statistics = ({ good, neutral, bad, getTotalFeedback }) => {
  const getAverageFeedback = () => getTotalFeedback() / 3;
  const getPositiveFeedbackPercentage = () => (good * 100) / getTotalFeedback();

  return (
    <table>
      <tbody>
        <StadisticLine value={good}>good</StadisticLine>
        <StadisticLine value={neutral}>neutral</StadisticLine>
        <StadisticLine value={bad}>bad</StadisticLine>
        <StadisticLine value={getTotalFeedback()}>all</StadisticLine>
        <StadisticLine value={getAverageFeedback()}>average</StadisticLine>
        <StadisticLine value={getPositiveFeedbackPercentage() + '%'}>
          positive
        </StadisticLine>
      </tbody>
    </table>
  );
};

const StadisticLine = ({ value, children }) => (
  <tr>
    <td>{children}</td>
    <td>{value}</td>
  </tr>
);

export default App;
