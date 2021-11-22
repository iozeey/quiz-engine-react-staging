import { find, remove } from "lodash";

export function handleDragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.setData(
    "question-id",
    e.target.getAttribute("data-question-id")
  );
  e.dataTransfer.setData(
    "possible_answer_id",
    e.target.getAttribute("data-possible-answer-id")
  );
}

export function handleDragEnterLeave(e) {
  if (e.type === "dragenter") {
  } else {
  }
}
export const handleOverDrop = (answers) => (e) => {
  let dataAttribute = e.target.getAttribute("data-box");
  let possible_question_number = parseInt(
    e.target.getAttribute("data-possible-answer-number")
  );
  let possible_answer_id = parseInt(
    e.dataTransfer.getData("possible_answer_id")
  );
  let target_question_id = parseInt(e.target.getAttribute("data-question-id"));
  let dropped_question_id = parseInt(e.dataTransfer.getData("question-id"));
  e.preventDefault();
  if (dataAttribute !== null || target_question_id !== dropped_question_id) {
    return;
  }

  if (
    e.type !== "drop" ||
    (e.target.children.length > 0 && e.target.id !== "parentBox")
  ) {
    return;
  }

  var draggedId = e.dataTransfer.getData("text");
  var draggedEl = document.getElementById(draggedId);

  if (draggedEl) {
    if (draggedEl.parentNode === e.target) {
      return;
    }
    draggedEl.parentNode.removeChild(draggedEl);
    e.target.appendChild(draggedEl);
    manageAnswers(
      answers,
      target_question_id,
      possible_question_number,
      possible_answer_id
    );
  }
  return true;
};

const manageAnswers = (
  answers,
  question_id,
  possible_question_number,
  possible_answer_id
) => {
  let found_answer = find(answers, ["question_id", question_id]);

  if (found_answer) {
    let found_possibile_answer = find(found_answer.selected_answers, [
      "id",
      possible_answer_id,
    ]);
    if (found_possibile_answer) {
      let answer_index = found_answer.selected_answers.indexOf(found_possibile_answer);
      remove(
        found_answer.selected_answers,
        (answer_item_id) =>
        found_answer.selected_answers.indexOf(answer_item_id) === answer_index 
      );
     
    }
    found_answer.selected_answers.push({
      number: possible_question_number,
      id: possible_answer_id,
    });
  } else {
    answers.push({
      question_id: question_id,
      selected_answers: [
        { number: possible_question_number, id: possible_answer_id },
      ],
    });
  }
  console.log("Answers", answers);
};
