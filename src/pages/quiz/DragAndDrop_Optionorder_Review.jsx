import React from "react";
import { size } from "lodash";
import { WrongAnswer } from "../../components/answers/wrong_answer";
import { CorrectAnswer } from "../../components/answers/correct_answer";
import { Answer } from "../../components/answers/badge/answer";

export const DragAndDropOptionorderReview = ({ question }) => {
  let user_selected_answers = [];
  let is_question_correct = false;
  let given_answer;
  let sys_number;

  if (size(question.user_selected) > 0) {
    is_question_correct = true;
    question &&
      question.user_selected &&
      question.user_selected.forEach((user_selected, index) => {
        question &&
          question.possible_answers &&
          question.possible_answers.forEach((possible_answer, id) => {
            is_question_correct = false;
            if (parseInt(possible_answer.id) === parseInt(user_selected.id)) {
              given_answer = possible_answer.prompt_content;
              sys_number = possible_answer.number;
            }
          });
        if (parseInt(sys_number) === parseInt(user_selected.number)) {
          is_question_correct = true;
        }

        user_selected_answers.push({
          given_answer: given_answer,
          sys_answer: question.possible_answers[index].prompt_content,
          is_question_correct: is_question_correct,
        });
      });
  } else {
    question.possible_answers &&
      question.possible_answers.forEach((possible_answer) => {
        user_selected_answers.push({
          given_answer: possible_answer.prompt_content,
        });
      });
  }

  return (
    <div>
      {user_selected_answers &&
        user_selected_answers.map((user_selected_answer) => (
          <div className="icon-wrapper d-inline inline-grid">
            <div className="d-inline me-1 badge bg-primary px-5">
              {user_selected_answer.given_answer}{" "}
            </div>

            {size(question.user_selected) === 0 ? (
              <WrongAnswer class="answer-badge bg-danger order-dragdrop_topright" />
            ) : user_selected_answer.is_question_correct ? (
              <CorrectAnswer class="answer-badge bg-success order-dragdrop_topright" />
            ) : (
              <>
                <WrongAnswer class="answer-badge bg-danger order-dragdrop_topright" />
                <Answer
                  badgeclass="badge d-inline  mt-1 me-1 bg-success "
                  value={user_selected_answer.sys_answer}
                />
              </>
            )}
          </div>
        ))}
    </div>
  );
};
