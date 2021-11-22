import React from "react";
import { Col, Container, Row } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import SubmitButton from "./../../components/buttons/SubmitButton";
import { Savebtn } from "../buttons/savebtn";
import Apex_chart from "./apex_chart";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { QuestionHeading } from "../question/question_heading";
import QuestionDescription from "../question/QuestionDescrption";
import { Collapsebtn } from "../buttons/collapsebtn";
import { TextArea } from "./textarea";

export function EssayWritting() {
    return (
        <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
            <Row>
                <Header />
            </Row>

            <Row className="border border-light mt-3 mb-3" xs="1" sm="2" md="4">

                <Col>

                    <div class="content-align-center">
                        <ExerciseType
                            title="Grammar exercise" />
                    </div>
                </Col>
                <Col>
                    <SuggestedTime
                        time="10" />
                </Col>
                <Col>
                    <NumberOfQuestions
                        questions="6" />
                </Col>
                <Col >
                    <Level
                        level="B2 (CERF)" />
                </Col>
            </Row>
            <Row className="border border-light  mb-3 mt-3">
                <QuestionHeading
                    question="Write about the population of turtles in india: 1980-2012" />
            </Row >
            <Row className="border border-light ">
                <Col>
                    <b>
                        <QuestionDescription
                            description="Write summary about the population of differnet types turtles in india"
                        />
                    </b>
                </Col>
                <Col>
                    <Apex_chart />

                </Col>
                <div className="text-end mt-3 mb-3 ">

                    <Collapsebtn />
                </div>

            </Row>

            <Row className="mt-3 mb-3 border border-light ">

                <TextArea
                    value="" />

            </Row>

            <Row className="border border-light mb-3 mt-3 ">

                <div class="row mb-3">
                    <div class="col-6 text-start">Words: 250 words</div>
                    <div class="col-6 text-end"> <Timer /> </div>
                </div>
            </Row>

            <Row className="border border-light">
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


