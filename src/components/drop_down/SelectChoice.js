import React from "react";

export function SelectChoice({ choices = [], onblur, isReview , id,...restprops }) {
  
  return (
    <div className="d-inline-flex mx-1 mb-1">
      <select
       
        className="form-select"
        style={{
          borderColor: "#2f56a1",
          backgroundImage: "url('/arrow-down.png')"
        }}
        onBlur={onblur}
        {...restprops}
      >
        {isReview ? null :  <option selected>select answer</option>}
        {choices &&
          choices.map((choice, index) => (
            <option key={choice.number} data-possible-question-id={choice.id} selected={id === choice.id ? true : false}>
              {choice.prompt_content.replaceAll(/(<([^>]+)>)/gi, "")}
            </option>
          ))}
        ;
      </select>
    </div>
  );
}
