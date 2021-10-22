import React, { useCallback, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { padStart } from "lodash";

export function Timer({
  totalTimeInSeconds,
  onStop,
  localSpentTime,
  isStopTimer,
}) {
  let options = {
    autoStart: true,
  };
  
  const localTime = new Date();
  localTime.setSeconds(
    localTime.getSeconds() +
      parseInt(localSpentTime)
  );

  if (localTime) {
    options = { ...options, offsetTimestamp: localTime };
  }
  const { seconds, minutes, pause, hours } = useStopwatch(options);
  let spent_minutes = padStart([`${minutes}`] , [2] , ['0']) ;
  let spent_seconds = padStart([`${seconds}`] , [2] , ['0']) ;
  const storeInLocalStorage = useCallback(() => {
    const timeInSeconds = seconds + minutes * 60 + hours * 60 * 60;
    if (timeInSeconds >= parseInt(totalTimeInSeconds * 60)) {
      onStop(timeInSeconds);
    }

    window.sessionStorage.setItem("timer", timeInSeconds);
  }, [minutes, seconds, hours, onStop, totalTimeInSeconds]);

  useEffect(() => {
    storeInLocalStorage();
  }, [storeInLocalStorage]);

  useEffect(() => {
    if (isStopTimer) {
      pause();
    }
  }, [isStopTimer, pause]);

  return (
    <div className="inline">
      Time: <span>{spent_minutes}</span>:<span>{spent_seconds}</span>{ totalTimeInSeconds ? `/${parseInt(totalTimeInSeconds)} min`: null }
    </div>
  );
}
