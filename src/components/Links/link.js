import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";


import { Home } from "../input_field_question/input_field_question";
import { InputFiledAnswer } from "../input_field_question/input_field_question_answer";
import { EssayWritting } from "../writting_essay/essay_writting";
import { DragDrop } from "../drag_drop/drag_drop";
import { DragDropAnswer } from "../drag_drop/drag_drop_answer";
import { TrueFalse } from "../true_false_questions/true_false";
import { TrueFalseAnswer } from "../true_false_questions/true_false_answer";
import { InputFiledColumns } from "../input_field_question/placement_test";
import { FillInBlanksAnswer } from "../fill_in_blanks/fill_in_blanks_answer";
import { FillInBlanks } from "../fill_in_blanks/fill_in_blanks";
import { ListeningExercise } from "../listening_exercise/audio_exercise";
import { ListeningExerciseAnswer } from "../listening_exercise/audio_exercise_answer";
import { DropDown } from "../drop_down/drop_down ";
import { GrammarDropDown } from "../drop_down/grammar_drop_down";
import { GrammarDropDownAnswer } from "../drop_down/grammar_drop_down_answer";
import { HomeExpand } from "../input_field_question/input_field_question_expand";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export function Links(props) {
    return (
        <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
            
            <BrowserRouter>
                <Row>
                    <Col>
                        <div class="mb-3"><Link to="/inputfieldcollapse" class="btn btn-primary">Input Filed</Link></div>
                        <div class="mb-3"><Link to="/InputFiledColumns" class="btn btn-primary">Input Filed (Type 2)</Link></div>
                        <div class="mb-3"><Link to="/inputfieldexpand" class="btn btn-primary">Input Filed (Type 3)</Link></div>
                        <div class="mb-3"><Link to="/inputfieldanswer" class="btn btn-success">Input Filed Answer</Link></div>
                        <div class="mb-3"><Link to="/FillInBlanks" class="btn btn-primary">Fill in Blanks</Link></div>
                        <div class="mb-3"><Link to="/FillInBlanksAnswer" class="btn btn-success">Fill in blanks Answer </Link></div>
                    </Col>
                    <Col>
                        <div class="mb-3"><Link to="/ListeningExercise" class="btn btn-primary">Listening Exercise</Link></div>
                        <div class="mb-3"><Link to="/ListeningExerciseAnswer" class="btn btn-success">Listening Exercise Answer</Link></div>
                        <div class="mb-3"><Link to="/DragDrop" class="btn btn-primary">Drag Drop</Link></div>
                        <div class="mb-3"><Link to="/DragDropAnswer" class="btn btn-success">Drag Drop Answer</Link></div>
                    </Col>
                    <Col>
                        <div class="mb-3"><Link to="/TrueFalse" class="btn btn-primary">True False</Link></div>
                        <div class="mb-3"><Link to="/TrueFalseAnswer" class="btn btn-success">True False Answer</Link></div>
                        <div class="mb-3"><Link to="/EssayWritting" class="btn btn-success">Essay Writing</Link></div>
                    </Col>
                    <Col>
                        <div class="mb-3"><Link to="/GrammarDropDown" class="btn btn-primary">Drop Down</Link></div>
                        <div class="mb-3"><Link to="/GrammarDropDownAnswer" class="btn btn-success">Drop Down Answer</Link></div>
                    </Col>

                </Row>

                <Switch>
                    <Route path="/inputfieldexpand">
                        <HomeExpand />
                    </Route>
                    <Route path="/inputfieldcollapse">
                        <Home />
                    </Route>
                    <Route path="/inputfieldanswer">
                        <InputFiledAnswer />
                    </Route>
                    <Route path="/InputFiledColumns">
                        <InputFiledColumns />
                    </Route>
                    <Route path="/TrueFalse">
                        <TrueFalse data = {props.data}/>
                    </Route>
                    <Route path="/TrueFalseAnswer">
                        <TrueFalseAnswer />
                    </Route>
                    <Route path="/FillInBlanks">
                        <FillInBlanks />
                    </Route>
                    <Route path="/FillInBlanksAnswer">
                        <FillInBlanksAnswer />
                    </Route>
                    <Route path="/ListeningExercise">
                        <ListeningExercise />
                    </Route>
                    <Route path="/ListeningExerciseAnswer">
                        <ListeningExerciseAnswer />
                    </Route>
                    <Route path="/GrammarDropDown">
                        <GrammarDropDown />
                    </Route>
                    <Route path="/GrammarDropDownAnswer">
                        <GrammarDropDownAnswer />
                    </Route>
                    <Route path="/DropDown">
                        <DropDown />
                    </Route>
                    <Route path="/DragDrop">
                        <DragDrop />
                    </Route>
                    <Route path="/DragDropAnswer">
                        <DragDropAnswer />
                    </Route>
                    <Route path="/EssayWritting">
                        <EssayWritting />
                    </Route>

                </Switch>

            </BrowserRouter>
        </Container>
    )
}