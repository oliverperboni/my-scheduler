import React from "react";
import { useEffect, useState } from "react";

function Scheduler(props) {
  // separando as props
  const {horaInicio,horaFim, intervalo, horaInicioTarde, horaFimTarde} = props

  //setando os UserStates que vamos usar
  const [startTime, setStartTime] = useState(horaInicio);
  const [endTime, setEndTime] = useState(horaFim);
  const [interval, setInterval] = useState(intervalo);
  const [startTimeAfter, setStartTimeAfter] = useState(horaInicioTarde);
  const [endTimeAfter, setEndTimeAfter] = useState(horaFimTarde);
  const [result, setResult] = useState([]);
  const [resultAfternoon, setResultAfternoon] = useState([]);
  

  //dar load assim que a pagina é carregada
  useEffect(() => {
    generateTimeRangeToMorning();
    generateTimeRangeToAfternoon();
    
  }, []);

  //função para dar load dos horarios de manhã
  const generateTimeRangeToAfternoon = () => {
    const startAfter = new Date(`2024-01-01T${startTimeAfter}`);
    const endAfter = new Date(`2024-01-01T${endTimeAfter}`);
    const intervalValueAfter = parseInt(interval, 10);
    const timeRange = [];
    let currentTime = startAfter;

    while (currentTime <= endAfter) {
      timeRange.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + intervalValueAfter);
    }

    setResultAfternoon(timeRange);
  };


  //função para dar load dos horarios de tarde
  const generateTimeRangeToMorning = () => {
    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);
    const intervalValue = parseInt(interval, 10);
    const timeRange = [];
    let currentTime = start;

    while (currentTime <= end) {
      timeRange.push( 
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + intervalValue);
    }

    setResult(timeRange);
  };

  return (
    <div>
      <div>
        <h2>Resultado da manhã:</h2>
        <ul>
          {result.map((time, index) => (
            <li key={index}>
              <button onClick={() => props.setData(time)}>{time}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Resultado da tarde:</h2>
        <ul>
          {resultAfternoon.map((time, index) => (
            <li key={index}>
              <button onClick={() => props.setData(time)}>{time}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Scheduler;
