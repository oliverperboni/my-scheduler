import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function DaysList(props) {
  const [WeekDay, setWeekDay] = useState([]);
  const [AtualDate, setAtualDate] = useState(new Date());
  const [dayWorked, setDayWorked] = useState([0,1,2,3,4,5])
  const dataRef = new Date(new Date());


  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/api/v1/employee/1",
    headers: {},
  };

 
  function workDays() {
    return new Promise((resolve, reject) => {
      axios.request(config)
        .then((response) => {
          resolve(response.data.workDays);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  workDays()
  .then((workDays) => {
    setDayWorked(workDays); 
  })
  .catch((error) => {
    console.log(error);
  });
  console.log(dayWorked)
  
  // Example usage:
 


  const loadDays = () => {
    const novaData = new Date(
      AtualDate.getFullYear(),
      AtualDate.getMonth(),
      AtualDate.getDate() + 7
    );
    setAtualDate(novaData);
    const novosWeekDay = getWeekDay(novaData, dayWorked);
    setWeekDay([...WeekDay, ...novosWeekDay]);
  };

  const returnDays = () => {
    const novaData = new Date(
      AtualDate.getFullYear(),
      AtualDate.getMonth(),
      AtualDate.getDate() - 7
    );
    console.log(novaData.getDate() >= dataRef.getDate());
    console.log(novaData.getMonth() >= dataRef.getMonth());
    console.log(novaData.getFullYear() >= dataRef.getFullYear());
    if (
      novaData.getDate() >= dataRef.getDate() ||
      (novaData.getDate() <= dataRef.getDate() &&
        novaData.getMonth() > dataRef.getMonth())
    ) {
      setAtualDate(novaData);
      const novosWeekDay = getWeekDay(novaData, dayWorked);
      setWeekDay(novosWeekDay);
    } else if (
      novaData.getDate() <= dataRef.getDate() &&
      novaData.getMonth() >= dataRef.getMonth() &&
      novaData.getFullYear() >= dataRef.getFullYear()
    ) {
    }
  };

 
  const getWeekDay = (date, dayNumbers) => {
    const days = [];
    dayNumbers.forEach((dayNumber) => {
      const dayToAdd = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (dayNumber - 1)
      );
      days.push({
        weekDay: dayToAdd.toLocaleDateString("pt-BR", { weekday: "long" }),
        date: dayToAdd.toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
        }),
      });
    });
    return days;
  };

  useEffect(() => {
    
    const novosWeekDay = getWeekDay(AtualDate, dayWorked);
    setWeekDay(novosWeekDay);
  }, [AtualDate]);

  return (
    <div>
      <h2>Lista de Dias da Semana</h2>
      <ul>
        {WeekDay.map((days) => (
          <li key={days.date}>
            <button onClick={() => props.setDay(days.weekDay)}>
              {days.weekDay} - {days.date}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={returnDays}>Voltar</button>
      <button onClick={loadDays}>Carregar Mais Dias</button>
    </div>
  );
}

export default DaysList;
