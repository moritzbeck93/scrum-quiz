import QuizQuestion from "../quiz-question/quiz-question";
import { Button, Card, Form } from "react-bootstrap";
import { Questions } from "../../models/questions";
import { AnswerdQuestions } from "../../pages/quiz";

function Results(props) {
  const calculatePercentage = (): number => {
    return parseFloat(((100 * props.score) / 7).toFixed(1));
  };

  const checkStylingForAnswer = (
    answer: AnswerdQuestions,
    index: number,
    answerOption
  ): JSX.Element => {
    if (answer.correctAnswerIndex[0] === index) {
      return (
        <Form.Check
          key={index}
          value={answerOption}
          type={answer.correctAnswerIndex.length > 1 ? "checkbox" : "radio"}
          label={answerOption}
          checked={answer.answer.includes(index)}
          isValid={true}
          readOnly={true}
        />
      );
    } else {
      return (
        <Form.Check
          key={index}
          value={answerOption}
          type={answer.correctAnswerIndex.length > 1 ? "checkbox" : "radio"}
          label={answerOption}
          checked={answer.answer.includes(index)}
          isInvalid={true}
          readOnly={true}
        />
      );
    }
  };

  const renderedAnswers = props.item.map((answer, index) => {
    return (
      <Card className="mx-auto max-w-2xl bg-white rounded-xl mt-3" key={answer._id}>
        <Card.Header>Question {index + 1} of 7</Card.Header>
        <Card.Body>
          <p>{answer.question}</p>
          <div className="answerSection">
            <Form>
              {answer.answers?.map((answerOption, index) =>
                checkStylingForAnswer(answer, index, answerOption)
              )}
            </Form>
          </div>
        </Card.Body>
      </Card>
    );
  });

  return (
    <>
      <div className="text-center mt-3">
        <h2>Results</h2>
        <p>Percentage: {calculatePercentage()} %</p>
        <p>Time: {props.time.mins}:{props.time.secs}</p>
        {calculatePercentage() < 85 ? (
          <div>
            <p className="text-9xl m-5 font-bold">&#128533;</p>
            <b>Sorry, you not passed the exam. Your Score is under 85%</b>
          </div>
        ) : (
          <div>
            <p className="text-9xl m-5 font-bold">&#127881;</p>
            <b>Congrats you passed the exam. Your Score is above 85%</b>
          </div>
        )}
      </div>
      {renderedAnswers}
    </>
  );
}

export default Results;
