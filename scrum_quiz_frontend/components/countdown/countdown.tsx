import { MissingStaticPage } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

function Countdown(props) {
  let mins = props.mins
  let secs = props.secs

  const updateTimeHandler = ([mins, sec]) => {
    props.onUpdateTime([mins, sec]);
  };

  const tick = () => {
    if (mins === 0 && secs === 0) {
        reset();
    } else if (secs === 0) {
      updateTimeHandler([mins - 1, 59]);
    } else {
      updateTimeHandler([mins, secs - 1]);
    }
  };

  const calculateProgressBar =  () => {
    return (100 * mins) / 30;
  }

  const reset = () => updateTimeHandler([parseInt(props.minutes), parseInt("0")]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`Time left: ${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</p>
      <ProgressBar now={calculateProgressBar()}/>
    </div>
  );
};

export default Countdown;