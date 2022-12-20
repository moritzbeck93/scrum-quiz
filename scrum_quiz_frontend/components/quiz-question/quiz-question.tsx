import { Button, Card, Form } from "react-bootstrap";
import { Questions } from "../../models/questions";

interface QuizQuestion {
      question: Questions;
      number: number;
      onSaveAnswer(answer: string)
}

function QuizQuestion(props: QuizQuestion) {
  const answerdQuestionHandler = (event) => {
    props.onSaveAnswer(event.target.value);
  };

  return (
    <>
      <Card className="mx-auto max-w-2xl bg-white rounded-xl mt-3">
        <Card.Header>Question {props.number + 1} of 7</Card.Header>
        <Card.Body>
          <p>{props.question.question}</p>
          <div className="answerSection">
            <Form key={props.number}>
              {props.question.answers?.map((answerOption, index) => (
                <Form.Check
                  key={index}
                  value={answerOption}
                  type={props.question.correctAnswerIndex.length > 1 ? "checkbox" : "radio" }
                  name= {"question_" + props.number + 1}
                  label={answerOption}
                  onChange={answerdQuestionHandler}
                />
              ))}
            </Form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default QuizQuestion;
