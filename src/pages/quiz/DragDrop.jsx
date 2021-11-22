import React from "react";
import {
  handleOverDrop,
  handleDragEnterLeave,
} from "./DragDropEvents";
export const DragDrop = ({question,answer,possible_answer_number}) => {
  return (
            <div 
            data-question-id={question.id}
            data-possible-answer-number={possible_answer_number}
             data-placeholder="Drag the Box here"
             className="dotted-border text-nowrap inline-grid mb-1"
             data-drop-target="true"
             onDragEnter={handleDragEnterLeave}
             onDragLeave={handleDragEnterLeave}
             onDrop={handleOverDrop(answer)}
             onDragOver={handleOverDrop(undefined)}
            ></div>
            
          
      
  );
};
