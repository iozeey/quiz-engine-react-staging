export const selectQuestionCounterOrCharacter = ({
  show_abc_sequence,
  index,
}) => {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return show_abc_sequence ? alphabet[index] : index + 1;
};

export const isInUserSelectedAnswers = (question, possible_answers_id) => {
  let user_selected_id = [];
  if (question.user_selected) {
    question.user_selected.forEach(element => {
      user_selected_id.push(element.id)
    }); 
  }
  return question && user_selected_id && user_selected_id.includes(possible_answers_id);
};
