import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const recognition = useRef(null);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const processResult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    setText(transcript);
  };

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.interimResults = true;
      recognition.current.lang = "en-US";
      recognition.current.onresult = processResult;
      recognition.current.onend = () => setListening(false);
    }
  }, []);

  const listen = () => {
    if (listening) return;
    setListening(true);
    recognition.current.start();
  };

  const stop = () => {
    if (!listening) return;
    setListening(false);
    recognition.current.stop();
  };

  return (
    <>
      <nav>
        {listening ? (
          <button onClick={stop}>listening...</button>
        ) : (
          <button onClick={listen}>DICTATE</button>
        )}
      </nav>
      <main>
        <textarea
          value={text}
          onClick={stop}
          onChange={(e) => setText(e.target.value)}
          resize="none"
        />
      </main>
    </>
  );
}
