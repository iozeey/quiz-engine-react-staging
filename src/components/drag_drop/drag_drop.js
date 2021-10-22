import { Col, Container, Row } from "reactstrap";
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import { Savebtn } from "../buttons/savebtn";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { QuestionHeading } from "../question/question_heading";
import QuestionDescription from "../question/QuestionDescrption";
import { Answer } from "../answers/badge/answer";
import SubmitButton from "./../../components/buttons/SubmitButton";

export function DragDrop() {
  return (
    <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
      <Row>
        <Header />
      </Row>

      <Row className="border border-light mt-3 mb-3" xs="1" sm="2" md="4">
        <Col>
          <div class="content-align-center">
            <ExerciseType title="Grammar exercise" />
          </div>
        </Col>
        <Col>
          <SuggestedTime time="10" />
        </Col>
        <Col>
          <NumberOfQuestions questions="3" />
        </Col>
        <Col>
          <Level level="B2 (CERF)" />
        </Col>
      </Row>
      <Row>
        <QuestionHeading question="Mix & Match the questions." />
      </Row>
      <Row>
        <div>
          <p class="font-size-18 ">
            <b>
              <QuestionDescription description="Drag the answer cross to match" />
            </b>
          </p>
        </div>
      </Row>
      <Row className="border border-light mt-3 font-size-18">
        <div class="row">
          <div class="col-9">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class=" bd-highlight">
                {" "}
                <p class="inline drag-drop-border">
                  <b>1. </b>How many million security{" "}
                </p>
              </div>
              <div class="bd-highlight">
                {" "}
                <p class="inline blue-color">------------------</p>
              </div>
              <div class=" bd-highlight">
                {" "}
                <p class="inline dotted-border">Drag the box here</p>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class=" bd-highlight text-end">
              {" "}
              <Answer
                class="badge inline dotted-border customized-badge pading"
                value="Option 1"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-9">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class=" bd-highlight">
                {" "}
                <p class="inline drag-drop-border">
                  <b>2. </b>How many million security{" "}
                </p>
              </div>
              <div class="bd-highlight">
                {" "}
                <p class="inline blue-color">------------------</p>
              </div>
              <div class=" bd-highlight">
                {" "}
                <p class="inline dotted-border">Drag the box here</p>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class=" bd-highlight text-end">
              {" "}
              <Answer
                class="badge inline dotted-border customized-badge pading"
                value="Option 1"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-9">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class=" bd-highlight">
                {" "}
                <p class="inline drag-drop-border">
                  <b>3. </b>How many million security{" "}
                </p>
              </div>
              <div class="bd-highlight">
                {" "}
                <p class="inline blue-color">------------------</p>
              </div>
              <div class=" bd-highlight">
                {" "}
                <p class="inline dotted-border">Drag the box here</p>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class=" bd-highlight text-end">
              {" "}
              <Answer
                class="badge inline dotted-border customized-badge pading"
                value="Option 1"
              />
            </div>
          </div>
        </div>
      </Row>
      <Row className="border border-light mb-12 ">
        <div class="row mb-3">
          <div class="col-12 text-end">
            {" "}
            <Timer />{" "}
          </div>
        </div>
      </Row>

      <Row>
        <div class="mb-3">
          <div class="inline float-start">
            <Savebtn />
          </div>
          <div class="inline float-end">
            <SubmitButton />
          </div>
        </div>
      </Row>
    </Container>
  );
}
