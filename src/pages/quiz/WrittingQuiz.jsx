import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "reactstrap";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import get from "lodash/get";
import { baseUrl } from "../../libs/env";
import { Exitbtn } from "../../components/buttons/exitbtn";
import { Level } from "./../../components/badges/level";
import { SuggestedTime } from "./../../components/badges/suggested_time";
import OpenButton from "./../../components/buttons/OpenButton";
import { Savebtn } from "./../../components/buttons/savebtn";
import SubmitButton from "./../../components/buttons/SubmitButton";
import { Header } from "./../../components/header/header";
import { ExerciseType } from "./../../components/heading/heading";
import SimpleModal from "./../../components/modals/SimpleModal";
import QuestionDescription from "./../../components/question/QuestionDescrption";
import { QuestionHeading } from "./../../components/question/question_heading";
import { Timer } from "./../../components/timer/timer";
import { getStudentid } from "../../libs/api/quiz";
import SuggestedWords from "./../../components/badges/SuggestedWords";
import { TextArea } from "./../../components/writting_essay/textarea";
import { Logo } from "./Logo";
import { size } from "lodash";

let answers;

const WrittingQuiz = ({ isLoaded, data, onSubmit, isReview }) => {
  const notify = () =>
    toast.success("Successfully Saved!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: 1,
    });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [isOpenAdditionalResourceModal, setOpenAdditionalResourceModal] =
    useState(false);
  const additionalResourceToggle = () =>
    setOpenAdditionalResourceModal(!isOpenAdditionalResourceModal);
  const [timer, setTimer] = useState();
  let [wordsCounter, setWordsCount] = useState(
    data.answers ? data.answers.split(" ").length : 0
  );

  if (data.completed_at) {
    isReview = true;
  }

  if (data.answers && data.completed_at === null) {
    answers = data.answers;
  }
  // answers=data.answers && data.completed_at === null ? data.answers : null;
  const [isStopTimer, setIsStopTimer] = useState(false);

  useEffect(() => {
    setTimer(
      data.status === "New" || data.time_spent === null
        ? "00"
        : get(data, "time_spent")
    );
  }, [data]);

  useEffect(() => {
    if (isReview !== undefined || data.status !== null) {
      window.addEventListener("beforeunload", alertUser);
      return () => {
        window.removeEventListener("beforeunload", alertUser);
      };
    }
  });
  const alertUser = (e) => {
    if (isReview === undefined) {
      creatQuizDataAndSave();
      e.preventDefault();
      e.returnValue = "";
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
    setIsStopTimer(false);
    toggle();
  };
  const creatQuizDataAndSave = () => {
    if (!isReview) {
      const timer = window.sessionStorage.getItem("timer");
      let quiz_data = {
        is_submit: false,
        time_spent: parseInt(timer),
        answers,
      };
      setIsStopTimer(true);
      onSubmit(quiz_data);
      setIsStopTimer(false);
      notify();
    }
  };
  let words_count, written_text;
  const onBlur = (e) => {
    answers = e.target.value;
  };

  const textarea_change = (e) => {
    written_text = e.target.value;
    words_count = written_text.split(" ").length;
    if (!written_text) {
      words_count = 0;
    }
    setWordsCount(words_count);
  };

  const { handleSubmit } = useForm();

  const onFormSubmit = () => {
    if (wordsCounter < 100 || wordsCounter > 1000) {
      toast.error(
        "Answer length must be between 100 and 1000 words, current words are:" +
          wordsCounter,
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: 1,
        }
      );
    } else {
      setModal(!modal);
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
              <div className="col">
                <Header />
              </div>
              <Col className="mt-3 text-end">
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
              {data.logo !== null ?
              <Col className="text-end">
                <Logo logourl={data.logo}/>
              </Col>
              :null}
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
                    <SuggestedWords words="350" />
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
                      <QuestionDescription
                        description={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.html_content,
                            }}
                          />
                        }
                        showbtn={true}
                      />
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
                      <span class="font-size-18 mt-3 mb-3">
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
                  <TextArea
                    defaultValue={
                      data.completed_at === null ? data.answers : null
                    }
                    value={isReview ? data.answers : null}
                    onchange={textarea_change}
                    onBlur={onBlur}
                  />
                </Row>
                <Row className="border border-light px-3 py-2">
                  <span className="text-muted">
                    {" "}
                    Words: {wordsCounter} words{" "}
                  </span>
                </Row>

                <Row>
                  <div class="mb-3 mt-3 p-0 m-0">
                    {isReview || data.user_type !== "School Student" ? null : (
                      <div class="inline float-start">
                        <Savebtn click={creatQuizDataAndSave} />
                        <ToastContainer />
                      </div>
                    )}
                    {data.user_type !== "School Student" ||
                      isReview ? (
                        <div className="row">
                        <div className="col-8">
                        {data && isReview ? (
                          null
                          // <div md className="mt-3 text-end">
                          //   <span className="p-1 score-content">
                          //     <b>
                          //       <div className="inline">
                          //         Score: { Math.floor(data.user_score)} / 100 points (
                          //         {Math.floor((data.user_score / 100) * 100)}%)
                          //       </div>
                          //     </b>
                          //   </span>
                          // </div>
                        ) : null}
                        </div>
                        <div className="text-end col-4">
                          {getStudentid ? (
                            <Exitbtn
                              href={`${baseUrl}/school/school_quiz_grading/${getStudentid}`}
                            />
                          ) : (
                            <Exitbtn
                              onClick={(e) => {
                                e.preventDefault();
                                window.close();
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div class="inline float-end">
                        <SubmitButton />
                      </div>
                    )}
                  </div>
                </Row>
              </div>


              <div className="row">
              <div className="text-center ">
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
            </div>




            </div>
          </div>
        </form>
      </div>



      <ConfirmationModal
        isOpen={modal}
        toggle={toggle}
        onClick={creatQuizDataAndSubmit}
      />
    </div>
  );
};

export default WrittingQuiz;
