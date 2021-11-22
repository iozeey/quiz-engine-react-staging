import React from "react";
import { ImageSwitch } from "./imageswitch";
export function Not_saved_bookmarks() {

    return (
        <div >
            <img src={"flag.png"} 
             onClick={ImageSwitch}
            />
            <span>Bookmark</span>
      </div>
    );
  }
