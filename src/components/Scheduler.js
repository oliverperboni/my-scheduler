import React from 'react'
import { useEffect, useState } from 'react';



function Scheduler(props) {
    const [startTime, setStartTime] = useState(props.horaInicio);
    const [endTime, setEndTime] = useState(props.horaFim);
    const [interval, setInterval] = useState(props.intervalo);
    const [startTimeAfter, setStartTimeAfter] = useState(props.horaInicioTarde);
    const [endTimeAfter, setEndTimeAfter] = useState(props.horaFimTarde);
    const [result, setResult] = useState([]);
    const [resultAfternoon, setResultAfternoon] = useState([]);
    useEffect( () => {
      generateTimeRangeToMorning()
      generateTimeRangeToAfternoon()

    },[])

    const generateTimeRangeToAfternoon = () => {
      const startAfter = new Date(`2024-01-01T${startTimeAfter}`);
      const endAfter = new Date(`2024-01-01T${endTimeAfter}`);
      const intervalValueAfter = parseInt(interval, 10);
      const timeRange = [];
      let currentTime = startAfter;
  
      while (currentTime <= endAfter) {
        timeRange.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        currentTime.setMinutes(currentTime.getMinutes() + intervalValueAfter);
      }
 
      setResultAfternoon(timeRange);
    };
  
    const generateTimeRangeToMorning = () => {
      const start = new Date(`2024-01-01T${startTime}`);
      const end = new Date(`2024-01-01T${endTime}`);
      const intervalValue = parseInt(interval, 10);
      console.log("Na manhã o horaio é: "+props.horaFim)
      const timeRange = [];
      let currentTime = start;
  
      while (currentTime <= end) {
        timeRange.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Resultado da tarde:</h2>
          <ul>
            {resultAfternoon.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Scheduler