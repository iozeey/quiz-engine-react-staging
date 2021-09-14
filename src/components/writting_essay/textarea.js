import React from "react";
export function TextArea({value , onchange  ,...restprops}) {
  return (
    <textarea
      class="answer-area"
      name="answer-submission"
      id="submission-text"
      type="text"
      value={value}
      spellcheck="false"
      data-gramm="false"
      placeholder="start writting Here...."
      onChange={onchange}
      {...restprops}
    ></textarea>
  );
}
