// AudioRecorder.jsx
import React, { useState, useRef } from "react";
import vmsg from "vmsg";
import "./AudioRecorder.css";

const AudioRecorder = () => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef(null);

  const startRecording = () => {
    setIsRecording(true);

    recorder.current = new vmsg.Recorder({
      wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
    });
    recorder.current.initAudio().then(() => {
      recorder.current.initWorker().then(() => {
        recorder.current.startRecording();
      });
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    recorder.current.stopRecording().then((blob) => {
      setRecordings((prevRecordings) => [...prevRecordings, blob]);
    });
  };

  return (
    <div className="audio-recorder-container">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{ backgroundColor: isRecording ? "red" : "green" }}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <h2>Recordings:</h2>
      <ul>
        {recordings.map((blob, index) => (
          <li key={index} className="list">
            {/* Use the HTML5 audio player with standard controls */}
            <audio controls>
              <source src={URL.createObjectURL(blob)} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioRecorder;
