import React from "react";
export function InputFiled({fieldLength, maxLength, value, name, onblur, ...restProps }) {
  return (
    <div class="inline-grid mx-1 mb-1">
      <input
        type="text"
        name={name}
        value={value}
        size={fieldLength}
        maxLength={maxLength}
        onBlur={onblur}
        autoComplete="off"
        class="form-control-sm form-control-custom-sm"
        style={{ borderColor: "#2f56a1" }}
        {...restProps}
      />
    </div>
  );
}
