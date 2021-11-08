import React, { useEffect, useState } from "react";
import { CheckBox } from "./../../components/checkbox/checkbox";
import { Label } from "./../../components/checkbox/label";
import Question from "./../../components/question/question";
import { Radio } from "./../../components/radio_buutons/radio";
import { selectQuestionCounterOrCharacter } from "./QuizRunner.helpers";
import PropTypes from "prop-types";
import { CorrectAnswer } from "../../components/answers/correct_answer";
import { InputFiled } from "../../components/input_fields/input_field";
import { WrongAnswer } from "../../components/answers/wrong_answer";
import ReactHtmlParser from "react-html-parser";
import { isInUserSelectedAnswers } from "./QuizRunner.helpers";
import { size } from "lodash";
import { Answer } from "../../components/answers/badge/answer";
import { DragDrop } from "./DragDrop";
import { SelectChoice } from "../../components/drop_down/SelectChoice";
import {
  handleDragStart,
  handleOverDrop,
  handleDragEnterLeave,
} from "./DragDropEvents";

function ShowQuestions({
  questions,
  onAnswer,
  currentPage,
  isReview,
  answer,
  status,
}) {
  let inputFiledLength = [];
  let checkflag = false;
  const [currentQuestion, setCurrentQuestion] = useState(currentPage);

  useEffect(() => {
    setCurrentQuestion(currentPage);
  }, [currentPage]);

  let isShowNumbering = size(questions) > 1;
  let fieldNumber , fieldlenght = 0;

  return (
    <div>
      {questions &&
        questions.map((question, qai) => {
          if (
            isReview ||
            status === null ||
            parseInt(currentQuestion) === parseInt(question.page)
          ) {
            question.prompt_content.replace(
              /\[\[[^\]]*\]\]\*([\d]+)/g,
              function replacer(matched) {
                matched.replace(/\[\[[^\]]*\]\]/g, function replace(match) {
                  fieldNumber = match.match(/\d+/)
                 
                });
                matched.replace(/\*([\d]+)/g, function replacer(matched) {
                  fieldlenght = matched.match(/\d+/)
                });
                inputFiledLength.push({questionNumber : question.id,fieldNumber :  fieldNumber[0], fieldlenght: fieldlenght[0]});
              }
            );
            const trimedString = question.prompt_content.trim();
            const converted = trimedString.replace(
              /\[\[[^\]]*\]\]/g,
              function replacer(matched) {
                return question.type === "FillInBlank"
                  ? `<input type="text" className="form-control-sm" data-id ="${matched.match(
                      /\d+/
                    )}"  class="inline"/>`
                  : question.type==="DragAndDrop" ?`<span type="text" className="form-control-sm" data-id ="${matched.match(
                    /\d+/
                  )}"  ></span>`:`<select data-id ="${matched.match(
                      /\d+/
                    )}"  class="inline"></select>`;
              }
            );

            return (
              <div className="mb-3" key={qai}>
                <div className="mb-3">
                {
                 question.type === "DragAndDrop"?
                question.possible_answers.map((element,id)=>{
                  return (
                    <div
                    id={`box${id}${qai}`}
                    draggable="true"
                    class="mb-3 me-1 inline"
                    onDragStart={handleDragStart}
                  >
                    <Answer
                      badgeclass="badge inline dotted-border customized-badge pading"
                      value={element.prompt_content}
                      data-box="box"
                    />
                  </div>
                    
                    
                    )
                })
               : null
                
                }
                </div>
                <div className="icon-wrapper">
                  <Question
                    // counterClass={getCounterCls(converted)}
                    showNumbers={isShowNumbering}
                    counterClass="me-2"
                    counter={qai + 1 + "."}
                    alignement = {question.question_alignement}
                    title={ReactHtmlParser(converted.replace(/\*([\d]+)/g,''), {
                      transform: (node) => {
                        if (node.name === "input") {
                          let user_answer = "";
                          answer.forEach((ans) => {
                            if (ans.question_id === question.id) {
                              ans.selected_answers.forEach((sel_ans) => {
                                if (
                                  parseInt(node.attribs["data-id"]) ===
                                  sel_ans["number"]
                                ) {
                                  user_answer = sel_ans["answer"];
                                }
                              });
                            }
                          });
                          let given_answer;
                          let corrent_answer;
                          if (isReview) {
                            if (question.user_selected) {
                              question.user_selected.forEach(
                                (user_selected) => {
                                  if (
                                    parseInt(node.attribs["data-id"]) ===
                                    user_selected.number
                                  ) {
                                    given_answer = user_selected["answer"];
                                  }
                                }
                              );
                            }

                            question.possible_answers.forEach(
                              (possible_answer) => {
                                if (
                                  parseInt(node.attribs["data-id"]) ===
                                  possible_answer.number
                                ) {
                                  corrent_answer =
                                    possible_answer.prompt_content;
                                }
                              }
                            );
                          }
                          let inputLenght = 0;
                          inputFiledLength.forEach((input_field_length)=>{
                              if (node.attribs["data-id"] === input_field_length.fieldNumber && input_field_length.questionNumber === question.id ) {
                                inputLenght=input_field_length.fieldlenght;
                              }
                          });
                          return (
                            <div class="inline-grid icon-wrapper">
                              <InputFiled
                                fieldLength={inputLenght === 0 ? question.input_field_length : inputLenght}
                                disabled={isReview}
                                data-question-type={question.type}
                                data-value={node.attribs["data-id"]}
                                data-question-id={question.id}
                                value={isReview ? given_answer : null}
                                defaultValue={user_answer ? user_answer : null}
                                onblur={onAnswer}
                                maxLength={question.input_field_characters_limit}
                                className={
                                  corrent_answer === given_answer
                                    ? "form-control-sm form-control-custom-sm"
                                    : "txt-danger-line-through form-control-sm form-control-custom-sm"
                                }
                              />

                              {isReview ? (
                                corrent_answer === given_answer ? (
                                  <CorrectAnswer class="answer-badge bg-success" />
                                ) : (
                                  <WrongAnswer class="answer-badge bg-danger" />
                                )
                              ) : null}
                              {isReview ? (
                                corrent_answer === given_answer ? null : (
                                  <Answer
                                    class="badge bg-success mb-1"
                                    value={corrent_answer}
                                  />
                                )
                              ) : null}
                            </div>
                          );
                        } 
                        else if(node.name==="span"){
                          
                         return <DragDrop/>
                        
                        }
                        else if (node.name === "select") {
                          let user_answer;
                          answer.forEach((ans) => {
                            if (ans.question_id === question.id) {
                              ans.selected_answers.forEach((sel_ans) => {
                                if (
                                  parseInt(node.attribs["data-id"]) ===
                                  sel_ans["number"]
                                ) {
                                  user_answer = sel_ans["id"];
                                }
                              });
                            }
                          });
                          let question_answer_number = [];
                          let dropdown_corrent_answer;

                          let question_flag;
                          if (isReview) {
                            question.possible_answers.forEach(
                              (possible_answer) => {
                                if (
                                  possible_answer.number ===
                                    parseInt(node.attribs["data-id"]) &&
                                  possible_answer.is_correct
                                ) {
                                  dropdown_corrent_answer =
                                    possible_answer.prompt_content.replaceAll(
                                      /(<([^>]+)>)/gi,
                                      ""
                                    );
                                }
                              }
                            );
                          }
                          if (isReview && question.user_selected) {
                            question.user_selected.forEach((user_selected) => {
                              if (
                                parseInt(node.attribs["data-id"]) ===
                                user_selected.number
                              ) {
                                question.possible_answers.forEach(
                                  (possible_answer) => {
                                    if (
                                      possible_answer.number ===
                                        user_selected.number &&
                                      possible_answer.id === user_selected.id
                                    ) {
                                      question_answer_number.push(
                                        possible_answer
                                      );

                                      question_flag =
                                        possible_answer.is_correct;
                                    }
                                  }
                                );
                              }
                            });
                          } else if (isReview === false) {
                            question.possible_answers.forEach(
                              (question_number) => {
                                if (
                                  parseInt(node.attribs["data-id"]) ===
                                  question_number.number
                                ) {
                                  question_answer_number.push(question_number);
                                }
                              }
                            );
                          }
                          return (
                            <div class="inline-grid icon-wrapper">
                              <SelectChoice
                                id={user_answer}
                                disabled={isReview}
                                data-question-type={question.type}
                                data-value={node.attribs["data-id"]}
                                data-question-id={question.id}
                                placeholder_id={node.attribs["data-id"]}
                                choices={question_answer_number}
                                onblur={onAnswer}
                                isReview={isReview}
                                className={
                                  question_flag === false
                                    ? "txt-danger-line-through form-select form-select-custom-sm"
                                    : "form-select form-select-custom-sm"
                                }
                              />
                              {isReview ? (
                                question_flag === true ? (
                                  <CorrectAnswer class="answer-badge bg-success" />
                                ) : (
                                  <WrongAnswer class="answer-badge bg-danger" />
                                )
                              ) : null}
                              {isReview ? (
                                question_flag === true ? null : (
                                  <Answer
                                    class="badge bg-success mb-1"
                                    value={dropdown_corrent_answer}
                                  />
                                )
                              ) : null}
                            </div>
                          );
                        }
                      },
                    })}
                  />
                  {question.type === "RadioBox" ||
                  question.type === "CheckBox" ? (
                    <div
                      className={
                        question.question_horizontal_display
                          ? "row d-inline-flex  align-items-end "
                          : null
                      }
                    >
                      {question.possible_answers.map(
                        (possible_answers, pai) => (
                          <div
                            className={
                              question.type === "RadioBox" ||
                              question.type === "CheckBox"
                                ? question.question_horizontal_display
                                  ? "d-flex mt-2 ms-3 inline-grid col"
                                  : "d-flex mt-2 ms-3"
                                : null
                            }
                          >
                            <label for={possible_answers.id}>
                              {possible_answers.image &&
                              question.question_horizontal_display ? (
                                <img
                                  src={possible_answers.image}
                                  height={possible_answers.image_height}
                                  px
                                  alt="img"
                                />
                              ) : (
                                ""
                              )}
                            </label>
                            <div
                              className={
                                question.type === "RadioBox" ||
                                question.type === "CheckBox"
                                  ? "form-check d-flex align-items-center form-check-inline custom-form-check"
                                  : null
                              }
                            >
                              {answer.forEach((ans) => {
                                if (ans.question_id === question.id) {
                                  ans.selected_answers.forEach((sel_ans) => {
                                    if (possible_answers.id === sel_ans["id"]) {
                                      checkflag = true;
                                    }
                                  });
                                }
                              })}
                              <span>
                                {selectQuestionCounterOrCharacter({
                                  index: pai,
                                  show_abc_sequence: question.show_abc_sequence,
                                }) + "."}
                              </span>
                              {question.type === "CheckBox" ? (
                                <CheckBox
                                  defaultChecked={
                                    checkflag === true ? checkflag : null
                                  }
                                  index={
                                    selectQuestionCounterOrCharacter({
                                      index: pai,
                                      show_abc_sequence:
                                        question.show_abc_sequence,
                                    }) + "."
                                  }
                                  data-question-id={question.id}
                                  data-question-type={question.type}
                                  onClick={onAnswer}
                                  value={possible_answers.id}
                                  id={possible_answers.id}
                                  name={`answers[${qai}].selected_answers[${pai}]`}
                                  checked={
                                    isReview
                                      ? isInUserSelectedAnswers(
                                          question,
                                          possible_answers.id
                                        )
                                      : null
                                  }
                                  className={
                                    isReview &&
                                    !isInUserSelectedAnswers(
                                      question,
                                      possible_answers.id
                                    ) &&
                                    possible_answers.is_correct
                                      ? "form-check-input correct_answers ms-2"
                                      : "form-check-input ms-2"
                                  }
                                />
                              ) : question.type === "RadioBox" ? (
                                <Radio
                                  defaultChecked={
                                    checkflag === true ? checkflag : null
                                  }
                                  index={
                                    selectQuestionCounterOrCharacter({
                                      index: pai,
                                      show_abc_sequence:
                                        question.show_abc_sequence,
                                    }) + "."
                                  }
                                  data-question-id={question.id}
                                  data-question-type={question.type}
                                  onClick={onAnswer}
                                  value={possible_answers.id}
                                  id={possible_answers.id}
                                  name={`answers[${qai}].selected_answers`}
                                  checked={
                                    isReview
                                      ? isInUserSelectedAnswers(
                                          question,
                                          possible_answers.id
                                        )
                                      : null
                                  }
                                  className={
                                    isReview &&
                                    !isInUserSelectedAnswers(
                                      question,
                                      possible_answers.id
                                    ) &&
                                    possible_answers.is_correct
                                      ? "form-check-input correct_answers ms-2"
                                      : "form-check-input ms-2"
                                  }
                                />
                              ) : null}
                              {(checkflag = false)}
                              <div
                                class={
                                  question.type === "RadioBox" ||
                                  question.type === "CheckBox"
                                    ? "icon-wrapper"
                                    : null
                                }
                              >
                                {question.type === "RadioBox" ||
                                question.type === "CheckBox" ? (
                                  <Label
                                    for={possible_answers.id}
                                    label={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${
                                            possible_answers.prompt_content
                                              ? possible_answers.prompt_content
                                              : ""
                                          } ${
                                            possible_answers.image &&
                                            !question.question_horizontal_display
                                              ? `<img src=${possible_answers.image} height=${possible_answers.image_height}px/>`
                                              : ""
                                          }`,
                                        }}
                                      />
                                    }
                                  />
                                ) : null}
                                {possible_answers.is_correct === true &&
                                  isReview === true &&
                                  (question.type === "CheckBox" ||
                                    question.type === "RadioBox") &&
                                  isInUserSelectedAnswers(
                                    question,
                                    possible_answers.id
                                  ) && (
                                    <CorrectAnswer class="answer-badge bg-success" />
                                  )}

                                {possible_answers.is_correct === false &&
                                  isReview === true &&
                                  (question.type === "CheckBox" ||
                                    question.type === "RadioBox") &&
                                  isInUserSelectedAnswers(
                                    question,
                                    possible_answers.id
                                  ) && (
                                    <WrongAnswer class="answer-badge bg-danger" />
                                  )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
}

ShowQuestions.defaultProps = {
  questions: [],
  currentQuestion: 1,
  isReview: false,
};

ShowQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
  onAnswer: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  isReview: PropTypes.bool,
};
export default ShowQuestions;
