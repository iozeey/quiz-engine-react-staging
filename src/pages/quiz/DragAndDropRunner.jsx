import React from "react";
import { DragAndDropCrossMatch } from "./DragAndDropCrossMatch";
import { DragAndDropFillinQuestion } from "./DragAndDropFillinQuestion";
import { OrderDragDrop } from "./OrderDragDrop";


export  const DragAndDropRunner = ({question,isShowNumbering,qai,answer,isReview}) =>{

  var QuestionType={
    "DragAndDropCrossMatch":"DragAndDropCrossMatch",
    "DragAndDropFillinQuestion":"DragAndDropFillinQuestion",
    "DragAndDropParagraphOrdering":"DragAndDropParagraphOrdering",
    "DragAndDropOptionsSorting":"DragAndDropOptionsSorting"
  }

  const trimedString = question.prompt_content.trim();
            const converted = trimedString.replace(
              /\[\[[^\]]*\]\]/g,
              function replacer(matched) {
                return `<span data-type="${question.type}" type="text" className="form-control-sm" data-id ="${matched.match(
                    /\d+/
                  )}"  ></span>`
              }
            );     
    return(
      <div>
        {
          question.type === QuestionType.DragAndDropCrossMatch ?
          <div class="mb-3">  
          <DragAndDropCrossMatch converted={converted} question={question} isShowNumbering={isShowNumbering} qai={qai} answer={answer} isReview={isReview} />
          </div>:
          question.type === QuestionType.DragAndDropFillinQuestion?
          <div class="mb-3">  
           <DragAndDropFillinQuestion converted={converted} question={question} isShowNumbering={isShowNumbering} qai={qai} answer={answer} isReview={isReview} />
           </div>
           : question.type === QuestionType.DragAndDropOptionsSorting?
           <OrderDragDrop question={question} qai={qai}  answers={answer} isReview={isReview} />:
           null
          
        }
      </div>
          
    );

}