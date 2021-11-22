import React, { Component } from "react";
import {Col, Container, Row  } from 'reactstrap';
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
import { CorrectAnswer } from "../answers/correct_answer";
import { WrongAnswer } from "../answers/wrong_answer";
import { Answer } from "../answers/badge/answer";


export function InputFiledAnswer (){
    return (
      <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
          <Row>
            <Header/>
          </Row>
         
          <Row className="border border-light mt-3 mb-3" xs="1" sm="2" md="4">
              <Col>
                  <div class = "content-align-center">
                    <ExerciseType title="Reading exercise R3"/>
                      <i>step to advance-chapter 2</i>
                  </div>
              </Col>
              <Col className="center">  
                  <SuggestedTime time="10"/>
               </Col>
               <Col className="center">
                <NumberOfQuestions questions = "2"/>
               </Col>
               <Col className="center">
                  <Level level="B2 (CERF)"/>
               </Col>
          </Row>
          <Row >
            <Col> 
               <QuestionHeading question ="Read the story about social media and answer the questions"/>
            </Col>
          </Row >
          <Row>
            <Col>
              <QuestionDescription description = "Social networking can connect strangers across the world. As the evolution of communication continues, technology progresses and social networking grows rapidily now and days.
                  Social networks like Instagram, Twitter, and Facebook have grown to have billions of users. In fact in today’s society, it is necessary or nearly expected to use one if not all of these technological communication networks. The increasing use of social networking has had both a negative and positive effect on communication in relationships. The purpose of this literary analysis is to answer if social networks are helpful or harmful to relationships. As social networking evolves, different aspects of communication suffer.
                  With the expedient process of getting to know someone, relationships can rise and fall much quicker. Aside from expediting relationships, there is the factor of getting to know someone for who they really are.
                  All of sudden,  a person's life will never give you an accurate represtation of reailty. we create the image that we want to convey through our activity on social media. Needless to say, it's much easier to convey the reality that we want to portray on internet then to live in real life. "/>
                <div className="text-end">
                  <Collapsebtn/>
               </div>
            </Col>

          </Row>
          <Row  className="border border-light mt-3 mb-3">
            <div >
                <span class="font-size-18 mt-3 mb-3">
                   <strong> Additional question resource </strong> 
                   <Openbtn/>
                </span>

            </div>
          </Row >
          <Row  className="border border-light">
              <div class="mt-3 mb-3 font-size-18 ">
                 <QuestionsToAttempt no_of_questions="1 - 2" />

                 <Question
                  question_counter = "1." 
                  question_title ="In what places were the first CCTV cameras used?"
                  />
              
                <div class="icon-wrapper mb-3">
                    <InputFiled
                      class = "form-control txt-danger-line-through"
                      value="They were first used as part of a chinese experment"
                    />
                    <WrongAnswer 
                      class="answer-badge bg-danger"
                    />
                    <Answer
                    class="badge bg-success even-larger-badge"
                    value="It was part of an experiment dating back to the USSR."
                    />
                  </div>
                  
                  <Question
                  question_counter = "2." 
                  question_title ="Where are they most commonly used today?"
                  />
                 <div class="icon-wrapper">
                  <InputFiled
                      class = "form-control "
                      value="China"
                    
                    />
                    <CorrectAnswer
                      class="answer-badge bg-success"
                    />
                </div>
              </div>
             
          </Row>
          <Row  className="border border-light mb-12 ">
          <div class="row">     
                <div class="col-7 text-end"> <Not_saved_bookmarks/> </div>      
                <div class="col-5 text-end"> <Timer/> </div>
          </div>
        
          
          </Row>
          <Row >
            <div class="p-4 mb-3 jumptron shadow-4 rounded-3">
                <p class="text-center">Part 1/2</p>
                <div>
                  <PartBorder class = "seperator left blue-border "/>
                  <PartBorder class = "seperator right grey-border"/> 
                </div>
            </div>
           
          </Row>
          <Row>
          <div class="mb-3 p-0 m-0">
                <div class="inline float-start">
                    <Savebtn/>
                </div>
                <div class="inline float-end">
                    <Nextbtn/>
                </div>      
              </div> 
          </Row>

      </Container>
     
    )
}
