import { useEffect, useState } from "react";

const useRecorder = () => {
  const [base64, setBase] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    const handleData = e => {
     let blob = new Blob([e.data], { type : 'audio/wav;codecs=flac' });
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

  return [base64 ,audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
