import React from "react";

export function Label(props) {
    return (
        <label class="d-flex inline" for={props.for}>{props.label}</label>
    )
}