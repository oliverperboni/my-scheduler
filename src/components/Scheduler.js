import React from 'react'
import { useState, useEffect } from 'react';



function Scheduler() {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [interval, setInterval] = useState('');
    const [result, setResult] = useState([]);
  
    const generateTimeRange = () => {
      const start = new Date(`2024-01-01T${startTime}`);
      const end = new Date(`2024-01-01T${endTime}`);
      const intervalValue = parseInt(interval, 10);
  
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || isNaN(intervalValue)) {
        setResult(['Por favor, insira horários e intervalo válidos.']);
        return;
      }
  
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
        <h1>Gerador de Intervalo de Tempo</h1>
        <label>
          Horário de Início:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <label>
          Horário de Fim:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
        <label>
          Intervalo (minutos):
          <input type="number" value={interval} onChange={(e) => setInterval(e.target.value)} />
        </label>
        <button onClick={generateTimeRange}>Gerar</button>
  
        <div>
          <h2>Resultado:</h2>
          <ul>
            {result.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Scheduler