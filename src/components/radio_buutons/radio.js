import React from "react";

export function Radio({ name, onBlur, id, checked, value,index,...restProps }) {
  return (
    
      <span>
        <input
          onBlur={onBlur}
          name={name}
          class="form-check-input"
          id={id}
          type="radio"
          checked={checked}
          value={value}
          {...restProps}
        />
      </span>
   
  );
}
