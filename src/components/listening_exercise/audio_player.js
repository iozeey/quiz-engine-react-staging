import React from "react";
export function AudioPlayer(props) {
    return (
        <audio controls controlsList="nodownload">
            <source src={props.src} type={props.type} />
        </audio>
    )
}