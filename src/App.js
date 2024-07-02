import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [quizData, setQuizDate] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz")
      .then((response) => {
        setQuizDate(response.data);
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleOptionChange = (questionId, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: value,
    });
  };
  const calculateScore = () => {
    let newScore = 0;
    quizData.forEach((question, index) => {
      if (selectedOptions[question.id] == question.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSelectedOptions({});
  };

  return (
    <>
      <h1>The Quiz App</h1>
      <div id="quiz-app">
        <div id="questions-content">
          {quizData.map((question, index) => {
            return (
              <div key={question.id}>
                <h3 className="question">
                  Q{index + 1}. {question.question}
                </h3>
                {question.options.map((option, optionIndex) => {
                  return (
                    <div className="option-wrapper" key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`q${question.id}`}
                          checked={
                            selectedOptions[question.id] == optionIndex + 1
                          }
                          onChange={() =>
                            handleOptionChange(question.id, optionIndex + 1)
                          }
                        />
                        <span>{option}</span>
                      </label>
                    </div>
                  );
                })}
                <hr />
              </div>
            );
          })}
          <br />
          <button className="submit-btn" onClick={calculateScore}>
            Submit
          </button>
        </div>
        <div id="score-content">
          <h2 id="score">
            Score :{score}/{quizData.length}
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
