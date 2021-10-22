import { React } from "react";

export function CheckBox({ onBlur, name, checked, id, value, index, ...restProps }) {
  return (
      <span>
        <input
          name={name}
          onBlur={onBlur}
          class="form-check-input"
          type="checkbox"
          id={id}
          checked={checked}
          value={value}
          {...restProps}
        />
      </span>
  );
}
