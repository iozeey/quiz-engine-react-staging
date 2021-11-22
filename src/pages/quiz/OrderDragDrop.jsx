import { find, remove, shuffle } from "lodash";
import DragSortableList from "react-drag-sortable";
// import { CorrectAnswer } from "../../components/answers/correct_answer";
// import { WrongAnswer } from "../../components/answers/wrong_answer";
import { Answer } from "../../components/answers/badge/answer";
import { DragAndDropOptionorderReview } from "./DragAndDrop_Optionorder_Review";


export const OrderDragDrop = ({ question, qai, answers, isReview }) => {
  
    let PossibleOptions = [];
    var onSort = function (sortedList) {
      let found_answer = find(answers, [
        "question_id",
        sortedList[0].question_id,
      ]);
      let question_id = sortedList[0].question_id;
      let selected_answers = [];

      sortedList.forEach((sorted_list) => {
        if (found_answer) {
          let answer_index = answers.indexOf(found_answer);
          remove(
            answers,
            (answer_item_id) => answers.indexOf(answer_item_id) === answer_index
          );
        }
        selected_answers.push({
          number: sorted_list.rank + 1,
          id: sorted_list.possible_answer_id,
        });
      });
      answers.push({
        question_id: question_id,
        selected_answers: selected_answers,
      });
    };
    if (PossibleOptions.length === 0) {
      shuffle(question.possible_answers).forEach((possible_answer) => {
        PossibleOptions.push({
          question_id: question.id,
          possible_answer_id: possible_answer.id,
          content: (
            <Answer
              class="badge inline dotted-border customized-badge pading"
              value={possible_answer.prompt_content}
            />
          ),
          classes: ["test me-2"],
        });
      });
    }
  

  return (
    <div className="d-flex mb-3">
      <b className="me-2"> {qai + 1 + "."}</b>
      <div className="d-flex">
        { isReview ? <DragAndDropOptionorderReview question={question} /> :
          <DragSortableList
            items={PossibleOptions}
            moveTransitionDuration={0.3}
            onSort={onSort}
            type="horizontal"
          />
        }
      </div>
    </div>
  );
};
