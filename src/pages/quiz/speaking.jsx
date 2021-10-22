import * as React from "react";
import useRecorder from "./useRecorder";

export const Speaking = ({ speakingUrl,speaking_data }) => {
  let [base64,audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  speakingUrl(base64);
  return (
    <div className="row">
      <div className="col-12 mb-3">
        <button
          type="button"
          onClick={!isRecording ? startRecording : stopRecording}
          class={
            !isRecording
              ? "btn btn-outline-dark btn-lg px-0 py-1"
              : "btn btn-outline-danger btn-lg px-0 py-1"
          }
        >
          <div>
            <span className="text-start pe-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill={!isRecording ? "#02b56b" : "#ee3b3b"}
                class="bi bi-mic-fill"
                viewBox="0 0 16 20"
              >
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
              </svg>
            </span>
            <b className="text-end pe-5"> {!isRecording ? "Start" : "Stop"} </b>
          </div>
        </button>
      </div>
      <div className="col-12 mb-3">
        <audio src={audioURL} controls controlsList="nodownload" />
      </div>
      <div className="col-12">
        {speaking_data}
      </div>
    </div>
  );
};
