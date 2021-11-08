import {
  handleDragStart,
  handleOverDrop,
  handleDragEnterLeave,
} from "./DragDropEvents";
import { Answer } from "../../components/answers/badge/answer";
export const DragDrop = () => {
  return (
            <div 
             data-placeholder="Drag the Box here"
             className="dotted-border d-inline"
             data-drop-target="true"
             onDragEnter={handleDragEnterLeave}
             onDragLeave={handleDragEnterLeave}
             onDrop={handleOverDrop}
             onDragOver={handleOverDrop}
            ></div>
          
      
  );
};
