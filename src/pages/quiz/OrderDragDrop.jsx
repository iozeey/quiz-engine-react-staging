import DragSortableList from "react-drag-sortable";
import { CorrectAnswer } from "../../components/answers/correct_answer";
import { WrongAnswer } from "../../components/answers/wrong_answer";
import { Answer } from "../../components/answers/badge/answer";

export const OrderDragDrop = () => {
  var onSort = function (sortedList) {
    console.log("sortedList", sortedList);
  };
  return (
    <div>
      <DragSortableList
        items={[
          {
            content: (
              <div className="icon-wrapper">
                {" "}
                <div className="parent-box-shadow">
                  {" "}
                  <span className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                  </span>
                  <WrongAnswer class="answer-badge bg-danger" />
                </div>
                <div className="mt-3  bg-success rounded p-3">
                  <Answer
                    class="text-light"
                    value=" explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                mollitia maiores labore suscipit quas? Nulla, placeat.
                Voluptatem quaerat non architecto ab laudantium modi minima
                sunt esse temporibus sint culpa, recusandae aliquam numquam
                totam ratione voluptas quod exercitationem fuga. Possimus
                quis earum veniam quasi aliquam eligendi, placeat qui
                corporis!"
                  />{" "}
                </div>
              </div>
            ),
            classes: ["test", "bigger", "mb-3"],
          },
          {
            content: (
              <div className="parent-box-shadow">
                {" "}
                <span className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                  harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                  quia. Quo neque error repudiandae fuga? Ipsa laudantium
                  molestias eos sapiente officiis modi at sunt excepturi
                  expedita sint? Sed quibusdam recusandae alias error harum
                  maxime adipisci amet laborum. Perspiciatis minima nesciunt
                  dolorem! Officiis iure rerum voluptates a cumque velit
                  quibusdam sed amet tempora. Sit laborum ab, eius fugit
                  doloribus tenetur
                </span>
              </div>
            ),
            classes: ["test", "bigger", "mb-3"],
          },
          {
            content: (
              <div className="parent-box-shadow">
                {" "}
                <span className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium
                </span>
              </div>
            ),
            classes: ["test", "bigger", "mb-3"],
          },
        ]}
        moveTransitionDuration={0.3}
        onSort={onSort}
        type="vertical"
      />
      <div>
        <DragSortableList
          items={[
            {
              content: (
                <Answer
                  class="badge inline dotted-border customized-badge pading"
                  value="Option 1"
                />
              ),
              classes: ["test me-2"],
            },
            {
              content: (
                <Answer
                  class="badge inline dotted-border customized-badge pading"
                  value="Option 2"
                />
              ),
              classes: ["test me-2"],
            },
            {
              content: (
                <div class="icon-wrapper">
                  <Answer
                    class="badge inline dotted-border customized-badge pading"
                    value="Option 3"
                  />
                  <CorrectAnswer class="answer-badge bg-success drag-drop-answer-batch" />
                </div>
              ),
              classes: ["test me-2"],
            },
            {
              content: (
                <Answer
                  class="badge inline dotted-border customized-badge pading"
                  value="Option 4"
                />
              ),
              classes: ["test me-2"],
            },
          ]}
          moveTransitionDuration={0.3}
          onSort={onSort}
          type="horizontal"
        />
      </div>
    </div>
  );
};
