import React from "react";
export function Select(props) {
    return (
        <select class={props.class} aria-label="Default select example" style={{ borderColor: "#2f56a1" }}>
            <option selected={props.selected}>{props.value}</option>
        </select>
    )
}