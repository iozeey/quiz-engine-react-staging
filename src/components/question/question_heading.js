import React from "react";

export function QuestionHeading(props) {
  return (
    <p class="font-size-18 mb-3">
      <span className="fw-bold me-1 mb-2">Question:</span> {props.question}{" "}
    </p>
  );
}
