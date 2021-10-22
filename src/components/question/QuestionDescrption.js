import React, { useRef, useLayoutEffect, useState } from "react";
import Collapse from "@kunukn/react-collapse";
import { Button } from "reactstrap";

export const getDomainUrl = () => `${window.location.origin}`;

const QuestionDescription = ({ description, showBtn }) => {
  const targetRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({
    actualHeight: 0,
  });

  useLayoutEffect(() => {
    setInterval(function(){
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight,
          actualHeight: targetRef.current.getClientRects()[0]["height"],
        });
      }
    },500);
  }, []);

  const toggle = (index) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      <Collapse
        isOpen={!isOpen}
        collapseHeight="70px"
        className="mb-3 app__collapse"
        render={(collapseState) => (
          <div
            ref={targetRef}
            className={!isOpen ? "" : "app__content"}
            onClick={() => (isOpen ? toggle() : null)}
          >
            {description}
          </div>
        )}
      />
      <div className="text-end">
        {showBtn && dimensions.actualHeight > 70 ? (
          <Button
            size="sm"
            onClick={() => toggle()}
            style={{
              backgroundColor: "#2f56a1",
              color: "white",
              marginBottom: "3px",
            }}
          >
            {isOpen ? (
              <div>
                <img src={`${getDomainUrl()}/arrowdown.png`} alt="" />
                Expand
              </div>
            ) : (
              <div>
                <img src={`${getDomainUrl()}/arrowup.png`} alt="" />
                Collapse
              </div>
            )}
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default QuestionDescription;
