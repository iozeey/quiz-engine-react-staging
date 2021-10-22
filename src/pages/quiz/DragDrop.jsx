import {
  handleDragStart,
  handleOverDrop,
  handleDragEnterLeave,
} from "./DragDropEvents";
import { Answer } from "../../components/answers/badge/answer";
export const DragDrop = () => {
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-10 col-md-10">
        <div className="row g-0 mb-3">
          <div className="col-6">
            <span className="border rounded border-primary p-2">
              <b>1.</b> How many millions security cameras are there?
            </span>
            <span className="text-primary">--------------</span>
          </div>
          <span className="col-6 text-center">
            <div
              data-placeholder="Drag the Box here"
              className="dotted-border"
              data-drop-target="true"
              onDragEnter={handleDragEnterLeave}
              onDragLeave={handleDragEnterLeave}
              onDrop={handleOverDrop}
              onDragOver={handleOverDrop}
            ></div>
          </span>
        </div>
        <div className="row g-0 mb-3">
          <div className="col-6">
            <span className="border rounded border-primary p-2">
              <b>1.</b> How many millions security cameras are there?
            </span>
            <span className="text-primary">--------------</span>
          </div>
          <span className="col-6 text-center">
            <div
              data-placeholder="Drag the Box here"
              className="dotted-border"
              data-drop-target="true"
              onDragEnter={handleDragEnterLeave}
              onDragLeave={handleDragEnterLeave}
              onDrop={handleOverDrop}
              onDragOver={handleOverDrop}
            ></div>
          </span>
        </div>
        <div className="row g-0 mb-3">
          <div className="col-6">
            <span className="border border-primary rounded p-2">
              <b>1.</b> How many millions security cameras are there?
            </span>
            <span className="text-primary">--------------</span>
          </div>
          <span className="col-6 text-center">
            <div
              data-placeholder="Drag the Box here"
              className="dotted-border"
              data-drop-target="true"
              onDragEnter={handleDragEnterLeave}
              onDragLeave={handleDragEnterLeave}
              onDrop={handleOverDrop}
              onDragOver={handleOverDrop}
            ></div>
          </span>
        </div>
      </div>
      <div className="col-12 col-lg-2 col-md-2 text-end ">
        <div
          id="parentBox"
          className="parent_box"
          data-drop-target="true"
          onDragEnter={handleDragEnterLeave}
          onDragLeave={handleDragEnterLeave}
          onDrop={handleOverDrop}
          onDragOver={handleOverDrop}
        >
          <div
            id="box1"
            draggable="true"
            class="mb-3"
            onDragStart={handleDragStart}
          >
            <Answer
              badgeclass="badge inline dotted-border customized-badge pading"
              value="Option 1"
              data-box="box"
            />
          </div>
          <div
            id="box2"
            draggable="true"
            class="mb-3"
            onDragStart={handleDragStart}
          >
            <Answer
              badgeclass="badge inline dotted-border customized-badge pading"
              value="Option 2"
              data-box="box"
            />
          </div>

          <div
            id="box3"
            draggable="true"
            class="mb-3"
            onDragStart={handleDragStart}
          >
            <Answer
              badgeclass="badge inline dotted-border customized-badge pading"
              value="Option 3"
              data-box="box"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
