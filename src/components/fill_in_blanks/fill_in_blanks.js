import React from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from "reactstrap";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { SuggestedTime } from "../badges/suggested_time";
import { Savebtn } from "../buttons/savebtn";
import SubmitButton from "./../../components/buttons/SubmitButton";

import { Header } from "../header/header";
import { ExerciseType } from "../heading/heading";
import { InputFiled } from "../input_fields/input_field";
import Question from "../question/question";
import { QuestionHeading } from "../question/question_heading";
import { Timer } from "../timer/timer";

export function FillInBlanks() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Col>
            <Level level="B2 (CERF)" />
          </Col>
        </Row>
        <Row>
          <Col>
            <QuestionHeading question="Read the dialouges. Complete them with i'm, i'm not, are, aren't, is or isn't" />
          </Col>
        </Row>
        <Row className="border border-light font-size-18">
          <div class="row mb-3  ">
            <Question question_counter="A." question_title="Are you mexican?" />
          </div>
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="bd-highlight">
              <Question question_counter="B." question_title="No, " />
            </div>
            <div class="mx-3 bd-highlight">
              <div class="icon-wrapper">
                <InputFiled
                  register={register("fillinblank1", {
                    required: true,
                    maxLength: 20,
                  })}
                  class="form-control form-control-sm"
                />
                {errors.fillinblank1 && (
                  <span className="text-danger">This feld is requred</span>
                )}
              </div>
            </div>
            <div class="bd-highlight">
              <Question question_title="Mexican. " />
            </div>
            <div class="mx-3 bd-highlight text-center">
              <div class="icon-wrapper">
                <InputFiled
                  register={register("fillinblank", {
                    required: true,
                    maxLength: 20,
                  })}
                  class="form-control form-control-sm"
                />
                {errors.fillinblank && (
                  <span className="text-danger">This feld is requred</span>
                )}
              </div>
            </div>
            <div class="bd-highlight">
              <Question question_title="Argentinian. " />
            </div>
          </div>
          <div class="row mb-3  ">
            <Question question_counter="A." question_title="Are you mexican?" />
          </div>
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="bd-highlight">
              <Question question_counter="B." question_title="No, " />
            </div>
            <div class="mx-3 bd-highlight">
              <div class="icon-wrapper">
                <InputFiled
                  register={register("fillinblank2", {
                    required: true,
                    maxLength: 20,
                  })}
                  class="form-control form-control-sm"
                />
                {errors.fillinblank2 && (
                  <span className="text-danger">This feld is requred</span>
                )}
              </div>
            </div>
            <div class="bd-highlight">
              <Question question_title="Mexican. " />
            </div>
            <div class="mx-3 bd-highlight text-center">
              <div class="icon-wrapper">
                <InputFiled
                  register={register("fillinblank3", {
                    required: true,
                    maxLength: 20,
                  })}
                  class="form-control form-control-sm"
                />
                {errors.fillinblank3 && (
                  <span className="text-danger">This feld is requred</span>
                )}
              </div>
            </div>
            <div class="bd-highlight">
              <Question question_title="Argentinian. " />
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
      </form>
    </Container>
  );
}
