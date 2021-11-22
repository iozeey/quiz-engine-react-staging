import React from "react";
import { DragDrop } from "./DragDrop";
import { includes } from "lodash";
import ReactHtmlParser from "react-html-parser";
import { Answer } from "../../components/answers/badge/answer";
import { handleDragStart } from "./DragDropEvents";
import Question from "../../components/question/question";
import { DragAndDropCrossMatchAndFillInQuestionReview } from "./DragAndDrop_CrossMatch_and_FillInQuestion_Review";

export const DragAndDropFillinQuestion = ({
  question,
  converted,
  isShowNumbering,
  qai,
  answer,
  isReview,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Question
            showNumbers={isShowNumbering}
            counterClass="me-2"
            counter={qai + 1 + "."}
            alignement={question.question_alignement}
            title={ReactHtmlParser(converted.replace(/\*([\d]+)/g, ""), {
              transform: (node) => {
                if (
                  node &&
                  node.attribs &&
                  includes(node.attribs["data-type"], "Drag")
                ) {
                  return isReview ? (
                    <DragAndDropCrossMatchAndFillInQuestionReview
                      question={question}
                      className={"d-inline"}
                      possible_answer_number={parseInt(node.attribs["data-id"])}
                    />
                  ) : (
                    <DragDrop
                      question={question}
                      answer={answer}
                      possible_answer_number={parseInt(node.attribs["data-id"])}
                    />
                  );
                }
              },
            })}
          />
        </div>
        {isReview ? null : (
          <div className="row order-first mb-3 gx-1">
            {question.possible_answers.map((possible_answer, id) => {
              return (
                <div class="d-inline col mb-2">
                  <div
                    id={`box${id}${qai}`}
                    draggable="true"
                    data-question-id={question.id}
                    data-possible-answer-id={possible_answer.id}
                    class="mb-1 d-inline"
                    onDragStart={handleDragStart}
                  >
                    <Answer
                      id="answer"
                      data-box-id="answer"
                      badgeclass="badge d-inline dotted-border w-100 customized-badge pading"
                      value={possible_answer.prompt_content}
                      data-box="box"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
