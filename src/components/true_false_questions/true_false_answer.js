import React, { Component } from "react";
import { Col, Container, Row  } from 'reactstrap';
import { Header } from "../header/header";
import { Timer } from "../timer/timer";
import { Nextbtn } from "../buttons/nextbtn";
import { Savebtn } from "../buttons/savebtn";
import { ExerciseType } from "../heading/heading";
import { SuggestedTime } from "../badges/suggested_time";
import { Level } from "../badges/level";
import { NumberOfQuestions } from "../badges/number_of_question";
import { QuestionHeading } from "../question/question_heading";
import QuestionDescription from "../question/QuestionDescrption";
import { QuestionsToAttempt } from "../question/questions_to_attempt";
import { Question } from "../question/question";
import { PartBorder } from "../border/partborder";
import { Collapsebtn } from "../buttons/collapsebtn";
import { CheckBox } from "../checkbox/checkbox";
import { CorrectAnswer } from "../answers/correct_answer";
import { WrongAnswer } from "../answers/wrong_answer";
import { Label } from "../checkbox/label";


export function TrueFalseAnswer() {

    return (
      <Container className="dashboard-wrapper container-fluid pg-content bg-white  p-md-5 p-3">
                   <Row>
            <Header/>
          </Row>
         
          <Row className="border border-light mt-3 mb-3" xs="1" sm="2" md="4">

              <Col>
             
                  <div class = "content-align-center">
                    <ExerciseType
                      title = "Reading exercise" />
                     
                  </div>
              </Col>
              <Col>  
                  <SuggestedTime time = "10"/>
               </Col>
               <Col>
                  <NumberOfQuestions questions="2"/>
               </Col>
               <Col >
                  <Level level = "B2 (CERF)"/>
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
          <Row  className="border border-light font-size-18 ">
            
              <div class="mt-3 mb-3">
             
                  <div class=" font-size-18 mt-3 mb-3">
                  <QuestionsToAttempt no_of_questions="3 - 4" />
              </div>
                  <div>
                  <p  >
                 
                  <div class="icon-wrapper">
                  <Question
                  question_counter = "3." 
                  question_title ="There are one million security cameras in UK?"
                  />
                     <CorrectAnswer 
                        class = "true-false-badge bg-success"
                     />
                    </div>
                  </p>
                  <div class="form-check form-check-inline">
                    <CheckBox value = "" checked ="True" />
                    <Label label = "True" />
                  </div>

                  <div class="form-check form-check-inline">
                    <CheckBox value = ""  />
                    <Label label = "False" />
                  </div>


                  </div>
                  <div>
                 
                  <p class="mt-3">
                  <div class="icon-wrapper">
                     <span class="font-size-18 ">
                       <Question
                          question_counter = "4."
                          question_title = "Studies have shown that CCTV is not effective."/>
                      </span>
                     <WrongAnswer 
                        class = "true-false-badge bg-danger"
                     />
                       
                    </div>
                  </p>
                  <div class="form-check form-check-inline">
                    <CheckBox value = ""  />
                    <Label label = "True" />
                  </div>

                  <div class="form-check form-check-inline">
                    <CheckBox value = "" checked ="True" />
                    <Label label = "False" />
                  </div>
                  

                  </div>
                 
              </div>
             
          </Row>
          <Row  className="border border-light mb-12 ">
        
          <div class="row">     
                    
                <div class="col-12 text-end"> <Timer/> </div>
          </div>
          </Row>
          <Row >
            <div class="p-4 mb-3 jumptron shadow-4 rounded-3">
                <p class="text-center">Part 2/2</p>
                <div>
                  <PartBorder class = "seperator left blue-border"/>  
                  <PartBorder class = "seperator left blue-border"/>  
                </div>
            </div>
           
          </Row>
          <Row>
          <div class="mb-3">
                <div class="inline float-start">
                    <Savebtn/>
                </div>
                <div class="inline float-end">
                    <Nextbtn/>
                </div>      
              </div>
          </Row>

      </Container>
     
    );
  }
