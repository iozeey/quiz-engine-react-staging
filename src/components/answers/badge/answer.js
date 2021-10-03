import React from "react";
export function Answer({badgeclass , value, ...restprops}){
    return(
        <span {...restprops} className={badgeclass}>{value}</span>
    );
}