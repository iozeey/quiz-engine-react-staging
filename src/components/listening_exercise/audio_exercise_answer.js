import React from "react";
import { Col, Container, Row } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import { Savebtn } from "../buttons/savebtn";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { QuestionHeading } from "../question/question_heading";
import { Question } from "../question/question";
import { AudioPlayer } from "./audio_player";
import { QuestionsToTick } from "../checkbox/checkbox_question_to_tick";
import { CheckBox } from "../checkbox/checkbox";
import { CorrectAnswer } from "../answers/correct_answer";
import { WrongAnswer } from "../answers/wrong_answer";
import { Label } from "../checkbox/label";
import SubmitButton from "./../../components/buttons/SubmitButton";

export function ListeningExerciseAnswer() {

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
          <NumberOfQuestions questions="2" />
        </Col>
        <Col >
          <Level level="B2 (CERF)" />
        </Col>
      </Row>
      <Row >
        <Col>
          <QuestionHeading question=" Listen to the recording and answer the questions below." />
        </Col>
      </Row >
      <Row >
        <div>
          <AudioPlayer
            src=""
            type="audio/mp3"
          />
        </div>

      </Row >
      <Row className="border border-light mt-3 font-size-18">
        <p class=" mb-3">
          <QuestionsToTick
            no_of_questions="1 - 3" />

        </p>
        <div className="mb-3">
          <div className="icon-wrapper mb-3">
            <Question
              question_counter="1."
              question_title="How many million security cameras are there in the UK?"
            />
            <CorrectAnswer class="true-false-badge bg-success" />

          </div>

          <div class="form-check mb-3">
            <CheckBox
              checked=""
              value=""
            />
            <Label
              label="1000" />


          </div>
          <div class="form-check mb-3">
            <CheckBox
              checked=""
              value=""
            />
            <Label
              label="3000" />
          </div>
          <div class="form-check mb-3">
            <CheckBox
              checked="True"
              value=""

            />
            <Label
              label="8000" />
          </div>
        </div>
        <div className="mb-3">
          <div className="mb-3">
            <div className="icon-wrapper">
              <Question
                question_counter="2."
                question_title="How many million security cameras are there in the UK? (More then one answer is possible)"
              />
              <WrongAnswer class="true-false-badge bg-danger" />

            </div>


          </div>

          <div class="form-check mb-3">
            <CheckBox
              checked=""
              value=""
            />
            <Label
              label="1000" />


          </div>
          <div class="form-check mb-3">
            <CheckBox
              checked="True"
              value=""
            />
            <Label
              label="3000" />
          </div>
          <div class="form-check mb-3">
            <CheckBox
              checked="True"
              value=""

            />
            <Label
              label="8000" />
          </div>
        </div>
        <div className="mb-3">
          <div className="mb-3">
            <div className="icon-wrapper">
              <Question
                question_counter="3."
                question_title="How many million security cameras are there in the UK? (More then one answer is possible)"
              />
              <WrongAnswer
                class="true-false-badge bg-danger"
              />

            </div>


          </div>

          <div class="form-check mb-3">
            <CheckBox
              checked=""
              value=""
            />
            <Label
              label="1000" />


          </div>
          <div class="form-check mb-3">
            <CheckBox
              checked="True"
              value=""
            />
            <Label
              label="3000" />
          </div>
          <div class="form-check mb-3">
            <CheckBox
              checked="True"
              value=""

            />
            <div className="icon-wrapper">
              <Label
                label="8000" />
              <WrongAnswer
                class="true-false-badge bg-danger"
              />
            </div>

          </div>
        </div>
      </Row>
      <Row className="border border-light mb-12 ">

        <div class="row mb-3">
          <div class="col-12 text-end"> <Timer /> </div>
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
