import React, {useState} from "react";

export function SelectChoice({ choices = [], onblur, isReview , id,...restprops }) {
  const [color, setColor] = useState(isReview ? "black" : "grey");
  const onchange = (e)=>{
    if (e.target.value) {
      setColor("black")
    }
  }
  
  return (
    <div className="d-inline-flex mx-1 mb-1">
      <select
       
        className="form-select"
        style={{
           color: color,
          borderColor: "#2f56a1",
          backgroundImage: "url('/arrow-down.png')"
        }}
        onChange={onchange}
        onBlur={onblur}
        {...restprops}
      >
        {isReview ? null :  <option selected value="" disabled hidden>select answer</option>}
        {choices &&
          choices.map((choice, index) => (
            <option class="text-dark" key={choice.number} data-possible-question-id={choice.id} selected={id === choice.id ? true : false}>
              {choice.prompt_content.replaceAll(/(<([^>]+)>)/gi, "")}
            </option>
          ))}
        ;
      </select>
    </div>
  );
}
