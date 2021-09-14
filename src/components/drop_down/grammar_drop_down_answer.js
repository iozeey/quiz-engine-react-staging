import React from "react";
import { Col, Container, Row } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import SubmitButton from "./../../components/buttons/SubmitButton";
import { Savebtn } from "../buttons/savebtn";
import { Select } from "./select";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import QuestionDescription from "../question/QuestionDescrption";
import { QuestionHeading } from "../question/question_heading";
import { CorrectAnswer } from "../answers/correct_answer";
import { WrongAnswer } from "../answers/wrong_answer";
import { Answer } from "../answers/badge/answer";

export function GrammarDropDownAnswer() {
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
                <QuestionHeading
                    question="Read the text and fill in the blanks"
                />
            </Row >
            <Row>
                <b class="font-size-18"> <QuestionDescription description="Select you answer from drop down box" /></b>
            </Row>
            <Row className="border border-light mt-3">


                < div class="question-content">
                    <div class="inline">
                        Social networking can connect  &emsp;
                    </div>
                    <div class="icon-wrapper inline-grid mb-3">
                        <Select
                            selected="True"
                            value="i'm not"
                            class="form-select "
                        />
                        <CorrectAnswer class="answer-badge bg-success" />
                    </div>
                    <div class="inline">
                    &emsp; strangers across the world. As the evolution of communication continues, technology progresses and social &emsp;

                    <div class="icon-wrapper inline-grid ">
                        <Select
                            selected="True"
                            value="Import"
                            class="form-select"
                        />
                        <CorrectAnswer class="answer-badge bg-success" />
                    </div>
                    </div>
                    &emsp; networking grows rapidily now and days.
                    <br />
                    <br />
                    Social networks like Instagram, Twitter, and Facebook have grown to have billions of users. In fact in today’s
                    &emsp;

                    <div class="icon-wrapper inline-grid ">
                        <Select
                            selected="True"
                            value="Import"
                            class="form-select txt-danger-line-through"

                        />
                        <WrongAnswer class="answer-badge bg-danger" />
                        <Answer
                            class="badge bg-success even-larger-badge"
                            value="Export"
                        />
                    </div>
                    &emsp;
                    society, it is necessary or nearly expected to use one if not all of these technological communication networks. The increasing use of social networking has had both a negative and positive effect on communication in relationships. The purpose of this literary analysis is to answer if social networks are helpful or harmful to relationships. As social networking evolves, different aspects of communication suffer.
                    <br />
                    <br />
                    With the expedient process of getting to know someone, relationships can rise
                    &emsp;

                    <div class="icon-wrapper inline-grid ">
                        <Select
                            selected="True"
                            value="Export"
                            class="form-select txt-danger-line-through"

                        />
                        <WrongAnswer class="answer-badge bg-danger" />
                        <Answer
                            class="badge bg-success even-larger-badge"
                            value="Import"
                        />
                    </div>
                    &emsp;
                    and fall much quicker. Aside from expediting relationships, there is the factor of getting to know someone for who they really are.
                    <br />
                    <br />
                    All of sudden,  a person's life will never give you an accurate represtation of reailty. we create the image that we want to convey through our activity on social media. Needless to say, it's much easier to convey the reality that we want to portray on internet then to live in real life.

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
