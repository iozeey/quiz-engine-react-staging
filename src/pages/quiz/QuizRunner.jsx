import { remove, size } from "lodash";
import find from "lodash/find";
import get from "lodash/get";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../libs/env";
import { Col, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import { Exitbtn } from "../../components/buttons/exitbtn";
import { Level } from "./../../components/badges/level";
import { NumberOfQuestions } from "./../../components/badges/number_of_question";
import { SuggestedTime } from "./../../components/badges/suggested_time";
import BackButton from "./../../components/buttons/BackButton";
import NextButton from "./../../components/buttons/NextButton";
import { AudioPlayer } from "../../components/listening_exercise/audio_player";
import OpenButton from "./../../components/buttons/OpenButton";
import { Savebtn } from "./../../components/buttons/savebtn";
import SubmitButton from "./../../components/buttons/SubmitButton";
import { Header } from "./../../components/header/header";
import { ExerciseType } from "./../../components/heading/heading";
import SimpleModal from "./../../components/modals/SimpleModal";
import { includes } from "lodash";
import { join } from "lodash";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { notify } from "../../components/notification/Notification";
import QuestionDescription from "../../components/question/QuestionDescrption";
import { QuestionHeading } from "./../../components/question/question_heading";
import { Timer } from "./../../components/timer/timer";
import ShowQuestions from "./ShowQuestions";

let answers = [];

const QuizRunner = ({ isLoaded, data, onSubmit, isReview }) => {
  if (data.completed_at != null) {
    isReview = true;
  }

  const [modal, setModal] = useState(false);
  let [showWarning, setShowWarnings] = useState();
  const [notAnsweredQuestion, setNotAnsweredQuestions] = useState("");
  const toggle = () => setModal(!modal);
  const [saveModal, setSaveModal] = useState(false);
  const [isOpenAdditionalResourceModal, setOpenAdditionalResourceModal] =
    useState(false);

  const additionalResourceToggle = () =>
    setOpenAdditionalResourceModal(!isOpenAdditionalResourceModal);
  const saveToggle = () => setSaveModal(!saveModal);
  const [isStopTimer, setIsStopTimer] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState();
  useEffect(() => {
    if (
      data &&
      data.time_spent &&
      size(answers) === 0 &&
      isReview === undefined
    ) {
      data.questions.forEach((question_item) => {
        if (size(question_item.user_selected) !== 0) {
          answers.push({
            question_id: question_item.id,
            selected_answers: question_item["user_selected"],
          });
        }
      });
    }
  }, [data, isReview]);

  useEffect(() => {
    setTimer(
      data.status === "New" || data.time_spent === null
        ? "00"
        : get(data, "time_spent")
    );
    setQuestions(get(data, "questions"));
  }, [data]);

  const alertUser = (e) => {
    if (isReview === undefined) {
      if (showWarning !== false) {
        creatQuizDataAndSave();
        e.preventDefault();
        e.returnValue = "";
      }
    }
  };
  const creatQuizDataAndSubmit = () => {
    const timer = window.sessionStorage.getItem("timer");
    let quiz_data = {
      is_submit: true,
      time_spent: parseInt(timer),
      answers,
    };
    setIsStopTimer(true);
    onSubmit(quiz_data);
    setShowWarnings(false);
    if (modal === true) {
      toggle();
    } else {
      saveToggle();
    }
  };
  const creatQuizDataAndSave = () => {
    if (data.status !== null) {
      const timer = window.sessionStorage.getItem("timer");
      let quiz_data = {
        is_submit: false,
        time_spent: parseInt(timer),
        answers,
      };

      setIsStopTimer(false);
      onSubmit(quiz_data);
      setIsStopTimer(false);
      notify("Successfully Saved!");
    }
  };

  useEffect(() => {
    if (isReview !== undefined || data.status !== null) {
      window.addEventListener("beforeunload", alertUser);
      return () => {
        window.removeEventListener("beforeunload", alertUser);
      };
    }
  });

  const onblur = (e) => {
    let question_id = parseInt(e.target.getAttribute("data-question-id"));
    let question_type = e.target.getAttribute("data-question-type");

    let is_checkbox_checked =
      question_type === "CheckBox" ? e.target.checked : null;
    let is_radio_checked =
      question_type === "RadioBox" ? e.target.checked : null;
    let sel_answer = parseInt(e.target.value);
    if (question_type === "CheckBox" || question_type === "RadioBox") {
      if (answers.length === 0) {
        answers.push({ question_id, selected_answers: [{ id: sel_answer }] });
      } else {
        let found_answer = find(answers, ["question_id", question_id]);
        if (found_answer) {
          let removed_selected_answer_arr = remove(
            found_answer.selected_answers,
            (sa_item_id) =>
              sa_item_id["id"] === sel_answer && is_checkbox_checked === false
          );
          if (
            found_answer.selected_answers.length === 0 &&
            is_checkbox_checked === false
          ) {
            let answer_index = answers.indexOf(found_answer);
            remove(
              answers,
              (answer_item_id) =>
                answers.indexOf(answer_item_id) === answer_index &&
                is_checkbox_checked === false
            );
          }
          if (removed_selected_answer_arr.length === 0 && is_checkbox_checked) {
            found_answer.selected_answers.push({ id: sel_answer });
          }
          if (is_radio_checked === true) {
            found_answer.selected_answers = [];
            found_answer.selected_answers.push({ id: sel_answer });
          }
        } else {
          answers.push({ question_id, selected_answers: [{ id: sel_answer }] });
        }
      }
    } else if (question_type === "FillInBlank") {
      if (e.target.value) {
        let answer = e.target.value;
        let question_number = parseInt(e.target.getAttribute("data-value"));
        if (answers.length === 0) {
          answers.push({
            question_id,
            selected_answers: [{ number: question_number, answer: answer }],
          });
        } else {
          let found_answer = find(answers, ["question_id", question_id]);
          if (found_answer) {
            let found_selected_answer = find(found_answer.selected_answers, [
              "number",
              question_number,
            ]);
            if (found_selected_answer) {
              found_selected_answer["answer"] = answer;
            } else {
              found_answer.selected_answers.push({
                number: question_number,
                answer: answer,
              });
            }
          } else {
            answers.push({
              question_id,
              selected_answers: [{ number: question_number, answer: answer }],
            });
          }
        }
      }
    } else if (question_type === "FillInBlankChoices") {
      let answer = parseInt(
        e.target.selectedOptions[0].getAttribute("data-possible-question-id")
      );
      let question_number = parseInt(e.target.getAttribute("data-value"));
      if (answers.length === 0) {
        answers.push({
          question_id,
          selected_answers: [{ number: question_number, id: answer }],
        });
      } else {
        let found_answer = find(answers, ["question_id", question_id]);
        if (found_answer) {
          let found_selected_answer = find(found_answer.selected_answers, [
            "number",
            question_number,
          ]);
          if (found_selected_answer) {
            found_selected_answer["id"] = answer;
          } else {
            found_answer.selected_answers.push({
              number: question_number,
              id: answer,
            });
          }
        } else {
          answers.push({
            question_id,
            selected_answers: [{ number: question_number, id: answer }],
          });
        }
      }
    }
    console.log("answers", answers);
  };

  const { handleSubmit } = useForm();

  const onFormSubmit = () => {
    let answeredQuestion = [];
    let notAnswered = [];
    let ans = [];
    let fields;
    answers.forEach((answer) => {
      let selectdAnswers = [];
      answeredQuestion.push(answer.question_id);
      answer.selected_answers.forEach((sel_answer) => {
        selectdAnswers.push(sel_answer.answer);
      });
      ans.push({ question_id: answer.question_id, selectdAnswers });
    });

    data.questions.forEach((question, i) => {
      let noOfFilelds = [];
      if (includes(answeredQuestion, question.id) === false) {
        notAnswered.push(i + 1);
      } else {
        if (
          question.type === "FillInBlankChoices" ||
          question.type === "FillInBlank"
        ) {
          question.prompt_content.replace(
            /\[\[[^\]]*\]\]/g,
            function replacer(matched) {
              let fieldNumber = `${matched.match(/\d+/)}`;
              noOfFilelds.push(fieldNumber);
            }
          );
          fields = size(noOfFilelds);

          ans.forEach((sel) => {
            if (sel.question_id === question.id) {
              if (parseInt(fields) !== size(sel.selectdAnswers)) {
                notAnswered.push(i + 1);
              }
            }
          });
        }
      }
    });
    if (size(notAnswered) > 0) {
      setNotAnsweredQuestions(join(notAnswered, ","));
      setModal(!modal);
    } else {
      setSaveModal(!saveModal);
    }
  };
  if (!isLoaded)
    return <h1 className="text-primary text-center">Loading...</h1>;
  return (
    <div className="dashboard-wrapper bg-white m-27">
      <div class="container quiz-background">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="p-md-5">
            <Row>
              <Col sm>
                <Header />
              </Col>
              <Col md className="mt-3 text-end">
                <span className="p-1 timer-content">
                  <b>
                    {data && timer && (
                      <Timer
                        isStopTimer={
                          data.status === null || isReview ? true : isStopTimer
                        }
                        totalTimeInSeconds={data.recom_time}
                        localSpentTime={timer}
                        onStop={(props) => {
                          // alert("Times up");
                          setIsStopTimer(false);
                          // creatQuizDataAndSubmit();
                        }}
                      />
                    )}
                  </b>
                </span>
              </Col>
            </Row>
            <Row>
              {data && isReview ? (
                <Col md className="mt-3 text-end">
                  <span className="p-1 score-content">
                    <b>
                      <div className="inline">
                        Score: { Math.floor(data.user_score)} / 100 points (
                        {Math.floor((data.user_score / 100) * 100)}%)
                      </div>
                    </b>
                  </span>
                </Col>
              ) : null}
            </Row>
            <div className="p-md-5">
              <div>
                <div
                  className="border border-light p-3 row"
                  xs="1"
                  sm="1"
                  md="4"
                >
                  <Col md>
                    <div class="content-align-center">
                      <ExerciseType title={data.task_type} />
                    </div>
                  </Col>

                  <Col md className="center">
                    <SuggestedTime time={data.recom_time} />
                  </Col>
                  <Col md className="center">
                    <NumberOfQuestions questions={size(data.questions)} />
                  </Col>
                  <Col md className="center">
                    <div className="d-flex">
                      <Level
                        level={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.task_levels,
                            }}
                          />
                        }
                      />
                    </div>
                  </Col>
                </div>
                <Row className="border border-light p-3">
                  <Col>
                    <div class="d-flex flex-column">
                      <QuestionHeading question={data.prompt_content} />
                      {data.audio ? (
                        <div className="mb-3">
                          {" "}
                          <AudioPlayer src={data.audio} />{" "}
                        </div>
                      ) : null}
                      {data.html_content && (
                        <QuestionDescription
                          description={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.html_content,
                              }}
                            />
                          }
                          showBtn={true}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
                <Row
                  className={
                    size(data.additional_resource) <= 0
                      ? ""
                      : "p-3 border border-light"
                  }
                >
                  {size(data.additional_resource) <= 0 ? (
                    ""
                  ) : (
                    <div>
                      <span class="mt-3 mb-3">
                        <strong> Additional question resource </strong>
                        <OpenButton
                          onClick={() =>
                            setOpenAdditionalResourceModal(
                              !isOpenAdditionalResourceModal
                            )
                          }
                        />
                      </span>
                    </div>
                  )}

                  <SimpleModal
                    isOpen={isOpenAdditionalResourceModal}
                    toggle={additionalResourceToggle}
                    bodyContent={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.additional_resource,
                        }}
                      />
                    }
                    footerContent={
                      <button
                        type="submit"
                        class="btn btn-sm mx-3 modal-button"
                        onClick={additionalResourceToggle}
                      >
                        Close
                      </button>
                    }
                  />
                </Row>
                <Row className="border border-light p-3">
                  <div className="d-flex">
                    <ShowQuestions
                      questions={questions}
                      currentPage={currentPage}
                      onAnswer={onblur}
                      isReview={isReview}
                      answer={answers}
                      status={data.status}
                    />
                  </div>
                </Row>
                {
                  isReview || data.total_pages === 1 ? null : ""
                  // <>
                  //   <Row className="border border-light mb-12">
                  //     <div class="row">
                  //       <div class="col-12 text-center">
                  //         <BookMarkButton />
                  //       </div>
                  //     </div>
                  //   </Row>

                  //   <Row>
                  //     <div class="p-4 mb-3 jumptron shadow-4 rounded-3">
                  //       <p class="text-center">
                  //         Part {currentPage}/{data.total_pages}
                  //       </p>
                  //       <div className="d-flex justify-content-center">
                  //         {[...Array(data.total_pages)].map((data, i) => (
                  //           <PartBar
                  //             currentPage={i + 1}
                  //             className="part-bar success-border flex-fill bd-highlight"
                  //             onClick={(props) => setCurrentPage(props)}
                  //           />
                  //         ))}
                  //       </div>
                  //     </div>
                  //   </Row>
                  // </>
                }

                <Row>
                  <div class="mb-3 mt-3 p-0 m-0">
                    {isReview || data.status === null ? null : (
                      <div class="inline float-start">
                        <Savebtn click={creatQuizDataAndSave} />
                        <ToastContainer />
                      </div>
                    )}
                    {isReview || data.status === null ? (
                      <div class="inline float-end">
                        {/* <Exitbtn href="https://staging.gradingly.com/" /> */}
                        <Exitbtn href={baseUrl} />
                      </div>
                    ) : (
                      <div class="inline float-end">
                        <span className="mx-1">
                          {currentPage > 1 && (
                            <BackButton
                              onClick={() => {
                                setCurrentPage(currentPage - 1);
                              }}
                            />
                          )}
                        </span>
                        <span>
                          {currentPage === data.total_pages && <SubmitButton />}
                        </span>
                        <span>
                          {currentPage !== data.total_pages && (
                            <NextButton
                              onClick={() => {
                                setCurrentPage(currentPage + 1);
                              }}
                            />
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </form>
        <Modal
          isOpen={modal}
          size="lg"
          toggle={toggle}
          className="modal-dialog-centered "
        >
          <ModalBody>
            <h4 className="text-primary">
              <strong>Warning!</strong>
            </h4>
            <p>Some answers are not completed, are you sure to continue?</p>
            <p className="text-danger">
              Question no: {notAnsweredQuestion} not completed.
            </p>
          </ModalBody>
          <ModalFooter style={{ border: 0 }}>
            <button
              type="submit"
              class="btn btn-sm mx-3 modal-button"
              onClick={toggle}
            >
              Edit
            </button>
            <button
              type="submit"
              class="btn btn-sm mx-3 modal-button"
              onClick={creatQuizDataAndSubmit}
            >
              Submit
            </button>
          </ModalFooter>
        </Modal>
        <ConfirmationModal
          isOpen={saveModal}
          toggle={saveToggle}
          onClick={creatQuizDataAndSubmit}
        />
      </div>
    </div>
  );
};

export default QuizRunner;
