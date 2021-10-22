import React from "react";
import { Col, Container, Row } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import SubmitButton from "./../../components/buttons/SubmitButton";
import { Savebtn } from "../buttons/savebtn";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { Question } from "../question/question";
import QuestionDescription from "../question/QuestionDescrption";
import { Select } from "./select";
export function DropDown() {
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
      <Row class="font-size-18 ">
        <div >
          <b >
            <QuestionDescription
              description="Select your answer from drop down box"
            />
          </b>

        </div>
      </Row >
      <Row className="border border-light mt-3 font-size-18">
        <div class="row">
          <p>
            <Question
              question_counter='1.'
              question_title="How many million security"
            />

            &emsp;
            <div class="inline-grid ">
              <Select
                selected="True"
                value="select"
                class="form-select "
              />
            </div>

            &emsp;
            <Question

              question_title="are there in UK?"
            />

          </p>
        </div>
        <div class="row">
          <p>
            <Question
              question_counter='2.'
              question_title="How many million "
            />

            &emsp;
            <div class="inline-grid ">
              <Select
                selected="True"
                value="select"
                class="form-select "
              />
            </div>

            &emsp;
            <Question

              question_title="cameras are there in UK?"
            />

          </p>

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
