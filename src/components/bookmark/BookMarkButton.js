import React from "react";
import { ImageSwitch } from "./imageswitch";
export const getDomainUrl = () => `${window.location.origin}`;

function BookMarkButton() {
  return (
    <div>
      <img src={`${getDomainUrl()}/flag_t.png`} onClick={ImageSwitch} alt="" />
      <span>Bookmark</span>
    </div>
  );
}
export default BookMarkButton;
