import React from "react";
import { Answer } from "../../components/answers/badge/answer";
import { CorrectAnswer } from "../../components/answers/correct_answer";
import { WrongAnswer } from "../../components/answers/wrong_answer";

export const DragAndDropCrossMatchAndFillInQuestionReview = ({
  question,
  className,
  possible_answer_number,
}) => {

  let Dclass="badge d-inline w-100 dotted-border text-secondary  mb-1";
  let user_selected_answer_id = 0;
  let user_selected_answer = "Drag the box here";
  let correct_answer = false;
  let sys_corrent_answer = "";

  question&&question.user_selected&&question.user_selected.forEach((user_selected) => {
    if (parseInt(user_selected.number) === parseInt(possible_answer_number)) {
      user_selected_answer_id = user_selected.id;
    }
  });

  question.possible_answers.forEach((possible_answer) => {
    if (parseInt(possible_answer.id) === parseInt(user_selected_answer_id)) {
      user_selected_answer = possible_answer.prompt_content;
      Dclass = " badge d-inline w-100 dotted-border customized-badge pading mb-1"

      if (
        parseInt(possible_answer.number) === parseInt(possible_answer_number)
      ) {
        correct_answer = true;
      }
    }

    if (
      parseInt(possible_answer.number) === parseInt(possible_answer_number) &&
      !correct_answer
    ) {
      sys_corrent_answer = possible_answer.prompt_content;
    }
  });


  return (
    <div className={className}>
      <div className="d-inline inline-grid icon-wrapper mb-1">
        <Answer
          badgeclass={Dclass}
          value={user_selected_answer}
        />
        {correct_answer === true ? (
          <CorrectAnswer class="answer-badge bg-success" />
        ) : (
          <>
            <WrongAnswer class="answer-badge bg-danger" />
            <Answer
              badgeclass="badge d-inline w-100 bg-success pading"
              value={sys_corrent_answer}
            />
          </>
        )}
      </div>
    </div>
  );
};
