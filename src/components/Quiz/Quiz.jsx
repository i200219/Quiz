import React, { useRef } from 'react'
import './Quiz.css'
import { useState } from 'react'
import { data } from '../../assets/Data';
function Quiz() {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [showScore, setShowScore] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);
    let option_array = [option1, option2, option3, option4];




    const checkAnswer = (e, ans) => {
        if(lock === false){
            if (ans === question.answer) {
                e.target.classList.add("correct");
                setScore(score + 1);
                setLock(true);
            }
            else {
                e.target.classList.add("incorrect");
                setLock(true);
                option_array[question.answer - 1].current.classList.add("correct");
            }

        }
        
    }

    const nextQuestion = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setShowScore(true);
                return 0;
            }
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option1.current.classList.remove("correct", "incorrect");
            option2.current.classList.remove("correct", "incorrect");
            option3.current.classList.remove("correct", "incorrect");
            option4.current.classList.remove("correct", "incorrect");
        }
    }
  return (
    <div className='container'>
      <h1>Quiz</h1>
      <hr/>
      {showScore ? <div className='score'>Your score is {score} out of {data.length}
        <div>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      </div>
       : <>
      <p>Start your quiz</p>
      <hr/>
      <h2>{index + 1} . {question.question}</h2>
      <ul>
        <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
        <li ref = {option2} onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
        <li ref = {option3} onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
        <li ref = {option4} onClick={(e) => checkAnswer(e, 4)}>{question.option4}</li>
      </ul>
      <button onClick={nextQuestion}>Next</button>
      <div className='index'>
        {index + 1} of {data.length} questions

      </div>
      </>}
      
    </div>
  )
}

export default Quiz
