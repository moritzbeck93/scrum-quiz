import { Button, Card, Form } from "react-bootstrap";
import { Questions } from "../../models/questions";
import useSWR from "swr";
import { useState } from "react";
import QuizQuestion from "../../components/quiz-question/quiz-question";
import Countdown from "../../components/countdown/countdown";
import Results from "../../components/results/results";

const fetcher = (apiURL: string) => fetch(apiURL).then((res) => res.json());

function Quiz() {
  const initialCompleteQuestion: AnswerdQuestions[] = [];

  const { data, error } = useSWR<Questions[]>("/quiz/questions", fetcher);

  const [currentQuestionIndex, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answeredQuestions, setAnsweredQuestion] = useState(initialCompleteQuestion);
  const [score, addPoint] = useState(0);
  const [[mins, secs], setTime] = useState([30, 0]);

  const saveAnswerHandler = (selectedAnswer: string) => {
    let answerPosition = data[currentQuestionIndex].answers.findIndex(
      (answer) => answer === selectedAnswer
    );

    const answeredQuestion: AnswerdQuestions = data[currentQuestionIndex];
    answeredQuestion.answer.push(answerPosition);

    //Sort Answer Array from 0-1 if more than one answer is given
    if (answeredQuestion.answer.length > 1) {
      answeredQuestion.answer = sortAnswerArray(answeredQuestion.answer);
    }

    if (
      JSON.stringify(answeredQuestion.correctAnswerIndex) ===
      JSON.stringify(answeredQuestion.answer)
    ) {
      answeredQuestion.correct = true;
      addPoint(score + 1);
    } else {
      answeredQuestion.correct = false;
    }

    setAnsweredQuestion((previousState) => [...previousState, answeredQuestion]);
  };

  const sortAnswerArray = (answers: number[]): number[] => {
    return answers.sort(function (a, b) {
      return a - b;
    });
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < 6) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const renderQuestionNumber = () => {
    return [...Array(40)].map((e, i) => (
      <li
        className="float-left mr-1.5 mb-1.5 py-1.5 bg-white !w-8 text-center cursor-pointer"
        key={i}
      >
        {i + 1}
      </li>
    ));
  };

  const updateTimeHandler = ([mins, secs]): void => {
    setTime([mins, secs]);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {showScore && (
        <Results item={answeredQuestions} score={score} time={{ mins: mins, secs: secs }}></Results>
      )}
      {!showScore && (
        <div className="container">
          <Card className="mx-auto max-w-2xl bg-white rounded-xl shadow-lg mt-5">
            <Card.Body>
              <Countdown onUpdateTime={updateTimeHandler} mins={mins} secs={secs} />
            </Card.Body>
          </Card>
          <Card className="mx-auto max-w-2xl !bg-gray-200 rounded-xl mt-3">
            <Card.Body>
              <ol>{renderQuestionNumber()}</ol>
            </Card.Body>
          </Card>
          <QuizQuestion
            question={data[currentQuestionIndex]}
            number={currentQuestionIndex}
            onSaveAnswer={saveAnswerHandler}
          ></QuizQuestion>
          <Button
            className="float-right"
            variant="primary mt-4"
            onClick={() => handleNextQuestion()}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export interface AnswerdQuestions extends Questions {
  answer?: number[];
  correct?: boolean;
}

export default Quiz;
