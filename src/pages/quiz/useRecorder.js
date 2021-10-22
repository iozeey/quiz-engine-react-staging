import { useEffect, useState } from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

const useRecorder = () => {
  const [base64, setBase] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [isWavUsed, setIsWavUsed] = useState(false);

  useEffect(() => {
    if (isWavUsed === false) {
      async function fetchMyAPI() {
        let response = await register(await connect());
        return response;
      }

      fetchMyAPI();
    }

    setIsWavUsed(true);
  }, [isWavUsed]);
  useEffect(() => {
    if (recorder === null) {
      console.log("recorder");

      if (isRecording) {
        console.log("isRecording");

        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    const handleData = (e) => {
      let blob = new Blob([e.data]);
      console.log("some", blob);

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        setBase(base64data);
      };
      setAudioURL(URL.createObjectURL(blob));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [base64, audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  // return new MediaRecorder(stream);

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  console.log("requestRecorder,", stream);
  const mediaRecoder = new MediaRecorder(stream, { mimeType: "audio/wav" });

  console.log("mediaRecoder,", mediaRecoder);
  return mediaRecoder;
}
export default useRecorder;
