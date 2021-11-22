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
import { Sendtaskbtn } from "../../components/buttons/sendTask";
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
import { Logo } from "./Logo";
import { Speaking } from "./speaking";
// import { OrderDragDrop  } from "./OrderDragDrop";
import ShowQuestions from "./ShowQuestions";
// import { DragDrop } from "./DragDrop";

let answers = [];

const QuizRunner = ({ isLoaded, data, onSubmit, isReview, isSubmitting }) => {
  if (data.completed_at !== null) {
    isReview = true;
  }

  const [modal, setModal] = useState(false);
  const [speakingUrl, setSpeakingUrl] = useState("");
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
    if (speakingUrl !== "") {
      answers = speakingUrl;
      window.localstream.getTracks().forEach(track => {
        track.stop();
      });
    }
   
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
    if (data.user_type === "School Student") {
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
    if (isReview === undefined && data.user_type === "School Student") {
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
    console.log("Answers", answers)
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
  let params = (new URL(document.location)).searchParams;
  let exercise_page_number = params.get("exercise_page_number");
  let show_exercises = params.get("show_exercises");
  let search = params.get("search");
  let student_content_type_choice = params.get("student_content_type_choice");
  let student_level_choice = params.get("student_level_choice");
  let exam_board_choice = params.get("exam_board_choice");
  let student_theme_choice = params.get("student_theme_choice");
  let student_function_choice = params.get("student_function_choice");
  let student_grammar_choice = params.get("student_grammar_choice");
  if (!isLoaded)
    return (
      <div class="centered text-light fs-4">
        <div class="spinner-border h-w-100" role="status"></div>
      </div>
    );
  return (
    <div className="dashboard-wrapper bg-white m-27">
      <div class="container bg-white">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="">
          
            
            <div className="p-md-5">
            <Row className="border p-3">
              <Col sm>
                <Header />
              </Col>
              <Col md className="mt-3 text-end">
                <span className="p-1 timer-content">
                  <b>
                    {data && timer && (
                      <Timer
                        isStopTimer={
                          data.user_type !== "School Student" || isReview
                            ? true
                            : isStopTimer
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
              {data.logo !== null ? (
                <Col md className="text-end">
                  <Logo logourl={data.logo} />
                </Col>
              ) : null}
            </Row>
              <div>
                <div
                  className="border border-top-0 p-3 row"
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
                <Row className="border border-top-0 p-3">
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
                      : "p-3 border border-top-0"
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
                <Row className="border border-top-0 p-3">
                  {data.task_type === "Speaking Task" ? (
                    <Speaking
                      speakingUrl={setSpeakingUrl}
                      speaking_data={data.speaking_plain_text_for_ml}
                      isReview={isReview}
                      speakingResponseURL={data.listening_file_url}
                    />
                  ) : (
                    <div>
                      <ShowQuestions
                        questions={questions}
                        currentPage={currentPage}
                        onAnswer={onblur}
                        isReview={isReview}
                        answer={answers}
                        status={data.status}
                      />
                      {/* <OrderDragDrop/> */}
                      {/* <DragDrop/> */}
                    </div>
                  )}
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

                <Row className="border border-top-0 p-3">
                  <div class=" p-0 m-0">
                    {isReview || data.user_type !== "School Student" ? null : (
                      <div class="inline float-start">
                          <>
                            <Savebtn
                              click={creatQuizDataAndSave}
                              disabled={isSubmitting}
                            />
                            <ToastContainer />
                          </>
                      </div>
                    )}
                    {isReview ||
                    (data.user_type === "School Student" &&
                      data.completed_at) ||
                    (data.user_type === "STAFF" && data.task_type ==="Speaking Task")|| data.user_type ==="School Account"? (
                      <div className="row">
                        <div className="col-md-8 col-12">
                          <div className="text-start col-md-4 col-12">
                              <Exitbtn
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.close();
                                }}
                              />
                          </div>
                          
                        </div>

                        <div className="text-end col-md-4 col-12">
                          { data.user_type !== "School Student" && !isReview?
                          <Sendtaskbtn
                            href={`${baseUrl}/school/search_content?exercise_id=${data.id}&exercise_page_number=${exercise_page_number}&show_exercises=${show_exercises}&search=${search}&student_content_type_choice=${student_content_type_choice}&student_level_choice=${student_level_choice}&exam_board_choice=${exam_board_choice}&student_theme_choice=${student_theme_choice}&student_function_choice=${student_function_choice}&student_grammar_choice=${student_grammar_choice}`}
                          />
                          :null
                          }
                        </div>
                      </div>
                    ) : (
                      <div class="inline float-end">
                        <span className="">
                          {currentPage > 1 && (
                            <BackButton
                              onClick={() => {
                                setCurrentPage(currentPage - 1);
                              }}
                            />
                          )}
                        </span>
                        <span>
                          {currentPage === data.total_pages && (
                           <div className="">
                              <SubmitButton disabled={isSubmitting} />
                           </div>
                            
                          )}
                           { data.user_type !== "School Student" && !isReview?
                          <div className="mt-3">
                            <Sendtaskbtn
                            href={`${baseUrl}/school/search_content?exercise_id=${data.id}&exercise_page_number=${exercise_page_number}&show_exercises=${show_exercises}&search=${search}&student_content_type_choice=${student_content_type_choice}&student_level_choice=${student_level_choice}&exam_board_choice=${exam_board_choice}&student_theme_choice=${student_theme_choice}&student_function_choice=${student_function_choice}&student_grammar_choice=${student_grammar_choice}`}
                            />
                          </div>
                          :null
                          }

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
                <Row>
                <div className="inline-grid ">
                            {data.user_score !== null &&
                            isReview && data.task_type !== "Speaking Task" ? (
                              <div md className="mt-3 text-center">
                                <span className="p-1 score-content">
                                  <b>
                                    <div className="inline">
                                      Score: {Math.floor(data.user_score)} / 100
                                      points (
                                      {Math.floor(
                                        (data.user_score / 100) * 100
                                      )}
                                      %)
                                    </div>
                                  </b>
                                </span>
                              </div>
                            ) : null}

                            
                          </div>
                <div className="pe-4 mt-3 text-center">
                              <a
                                class="btn btn-secondary py-1 text-nowrap"
                                href={`${baseUrl}/contact`}
                              >
                                <i class="pe-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-bug-fill"
                                    viewBox="0 0 16 20"
                                  >
                                    <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z" />
                                    <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z" />
                                  </svg>
                                </i>{" "}
                                Report a bug
                              </a>
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
