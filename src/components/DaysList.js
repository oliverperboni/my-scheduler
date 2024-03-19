import React from 'react'
import { useState, useEffect} from 'react';

function DaysList() {

  const [WeekDay, setWeekDay] = useState([]);
  const [AtualDate, setAtualDate] = useState(new Date());
  const dataRef = new Date(new Date());

  const loadDays = () => {
    const novaData = new Date(AtualDate.getFullYear(), AtualDate.getMonth(), AtualDate.getDate() + 7);
    setAtualDate(novaData);
    const novosWeekDay = getWeekDay(novaData);
    setWeekDay([...WeekDay, ...novosWeekDay]);
  };

  const returnDays = () => {
    const novaData = new Date(AtualDate.getFullYear(), AtualDate.getMonth(), AtualDate.getDate() - 7);
    if (novaData.getDate()>= dataRef.getDate() && novaData.getMonth()>= dataRef.getMonth() && novaData.getFullYear() >= dataRef.getFullYear()) {
      setAtualDate(novaData);
      const novosWeekDay = getWeekDay(novaData);
      setWeekDay(novosWeekDay);
    }
  };

  const getWeekDay = (data) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(data.getFullYear(), data.getMonth(), data.getDate() + i);
      days.push({
        weekDay: dia.toLocaleDateString('pt-BR', { weekday: 'long' }),
        date: dia.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }),
      });
    }
    return days;
  };

  useEffect(() => {
    const novosWeekDay = getWeekDay(AtualDate);
    setWeekDay(novosWeekDay);
  }, [AtualDate]);

  return (
    <div>
      <h2>Lista de Dias da Semana</h2>
      <ul>
        {WeekDay.map((days) => (
          <li key={days.date}>
            {days.weekDay} - {days.date}
          </li>
        ))}
      </ul>
      <button onClick={returnDays}>Voltar</button>
      <button onClick={loadDays}>Carregar Mais Dias</button>
    </div>
  );
}

export default DaysList