import {
  handleOverDrop,
  handleDragEnterLeave,
} from "./DragDropEvents";
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
