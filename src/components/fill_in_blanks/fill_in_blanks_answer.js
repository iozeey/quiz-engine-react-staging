import React, { Component } from "react";
import { Col, Container, Row } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import { Exitbtn } from "../buttons/exitbtn";
import { Savebtn } from "../buttons/savebtn";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { QuestionHeading } from "../question/question_heading";
import { Question } from "../question/question";
import { InputFiled } from "../input_fields/input_field";
import { CorrectAnswer } from "../answers/correct_answer";
import { WrongAnswer } from "../answers/wrong_answer";
import { Answer } from "../answers/badge/answer";


export function FillInBlanksAnswer() {
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
          <QuestionHeading question="Read the dialouges. Complete them with i'm, i'm not, are, aren't, is or isn't" />
        </Col>
      </Row >
      <Row className="border border-light  font-size-18">

        <div class="row">
          <Question
            question_counter="A."
            question_title="Are you mexican?"
          />
        </div>
        <div class="d-flex flex-row bd-highlight mb-3">
          <div class="bd-highlight font-size-18">
            <Question
              question_counter="B."
              question_title="No, "
            />
          </div>
          <div class="mx-3 bd-highlight">
            <div class="icon-wrapper">
              <InputFiled
                class="form-control form-control-sm"
                value="i'm not"
              />
              <CorrectAnswer
                class="answer-badge bg-success"
              />
            </div>
          </div>
          <div class="bd-highlight font-size-18">
            <Question
              question_title="Mexican. "
            />
          </div>
          <div class="mx-3 bd-highlight text-center">
            <div class="icon-wrapper">

              <InputFiled
                class="form-control form-control-sm txt-danger-line-through"
                value="i are "
              />
              <WrongAnswer
                class="answer-badge bg-danger"
              />
              <Answer
                class="badge bg-success even-larger-badge"
                value="i'm"
              />

            </div>
          </div>
          <div class="bd-highlight font-size-18">
            <Question
              question_title="Argentinian. "
            />
          </div>
        </div>
        <div class="row mb-3  ">
          <Question
            question_counter="A."
            question_title="Are you mexican?"
          />

        </div>
        <div class="d-flex flex-row bd-highlight mb-3">
          <div class="bd-highlight">
            <Question
              question_counter="B."
              question_title="No, "
            />
          </div>
          <div class="mx-3 bd-highlight">
            <div class="icon-wrapper">
              <InputFiled
                class="form-control form-control-sm"
              />
            </div>
          </div>
          <div class="bd-highlight">
            <Question

              question_title="Mexican. "
            />

          </div>
          <div class="mx-3 bd-highlight text-center">
            <div class="icon-wrapper">
              <InputFiled
                class="form-control form-control-sm"
              />

            </div>
          </div>
          <div class="bd-highlight">
            <Question

              question_title="Argentinian. "
            />
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
            <Exitbtn />
          </div>
        </div>
      </Row>

    </Container>


  );
}
