import React from "react";
import { ImageSwitch } from "./imageswitch";
export const getDomainUrl = () => `${window.location.origin}`;

export function Saved_bookmarks() {
  return (
    <div>
      <img src={`${getDomainUrl()}/flag_t.png`} onClick={ImageSwitch} alt="" />
      <span>Bookmark</span>
    </div>
  );
}
