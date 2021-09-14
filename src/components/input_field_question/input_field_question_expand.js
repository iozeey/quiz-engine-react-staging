import React, { Component } from "react";
import { Col, Container, Row } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import { Nextbtn } from "../buttons/nextbtn";
import { Savebtn } from "../buttons/savebtn";
import { Not_saved_bookmarks } from "../bookmark/not_saved_bookmarks";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { QuestionHeading } from "../question/question_heading";
import QuestionDescription from "../question/QuestionDescrption";
import { Openbtn } from "../buttons/openbtn";
import { QuestionsToAttempt } from "../question/questions_to_attempt";
import { Question } from "../question/question";
import { InputFiled } from "../input_fields/input_field";
import { PartBorder } from "../border/partborder";
import { Collapsebtn } from "../buttons/collapsebtn";
import { Expandbtn } from "../buttons/expandbtn";


export function HomeExpand() {
  return (
    <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
      <Row>
        <Header />
      </Row>

      <Row className="border border-light mt-3 mb-3" xs="1" sm="2" md="4">
        <Col>
          <div class="content-align-center">
            <ExerciseType title="Reading exercise R3" />
            <i>step to advance-chapter 2</i>
          </div>
        </Col>
        <Col className="center">
          <SuggestedTime time="10" />
        </Col>
        <Col className="center">
          <NumberOfQuestions questions="2" />
        </Col>
        <Col className="center">
          <Level level="B2 (CERF)" />
        </Col>
      </Row>
      <Row >
        <Col>
          <QuestionHeading question="Read the story about social media and answer the questions" />
        </Col>
      </Row >
      <Row>
        <Col>
          <div class="row">
            <div class="col-10">
              <QuestionDescription description="Social networking can connect strangers across the world. As the evolution of communication continues, technology progresses and social networking grows rapidily now and days...... " />
            </div>
            <div class="col-2">
              <div className="text-end">
                <Expandbtn />
              </div>

            </div>

          </div>


        </Col>

      </Row>
      
      <Row className="border border-light">
        <div class="mt-3 mb-3 font-size-18 ">
          <QuestionsToAttempt no_of_questions="1 - 2" />

          <Question
            question_counter="1."
            question_title="In what places were the first CCTV cameras used?"
          />


          <InputFiled
            class="form-control mb-3"

          />

          <Question
            question_counter="2."
            question_title="Where are they most commonly used today?"
          />

          <InputFiled
            class="form-control mb-3"

          />
        </div>

      </Row>
      <Row className="border border-light mb-12 ">
        <div class="row">
          <div class="col-7 text-end"> <Not_saved_bookmarks /> </div>
          <div class="col-5 text-end"> <Timer /> </div>
        </div>


      </Row>
      <Row >
        <div class="p-4 mb-3 jumptron shadow-4 rounded-3">
          <p class="text-center">Part 1/2</p>
          <div>
            <PartBorder class="seperator left blue-border " />
            <PartBorder class="seperator right grey-border" />
          </div>
        </div>

      </Row>
      <Row>
        <div class="mb-3 p-0 m-0">
          <div class="inline float-start">
            <Savebtn />
          </div>
          <div class="inline float-end">
            <Nextbtn />
          </div>
        </div>
      </Row>

    </Container>

  )
}
