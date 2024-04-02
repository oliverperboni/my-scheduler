
import React, { useState, useEffect } from "react";
import axios from "axios";

function DaysList(props) {
  const [weekDays, setWeekDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayWorked, setDayWorked] = useState([0, 1, 2, 3, 4, 5]);
  const dataRef = new Date(new Date());

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8000/my_scheduler_api/employees/3",
    headers: {},
  };

  useEffect(() => {
    const fetchWorkDays = async () => {
      try {
        const response = await axios.request(config);
        const fetchedDays = response.data.workDays || [];
        setDayWorked(fetchedDays);
        const newWeekDays = getWeekDays(currentDate, fetchedDays);
        setWeekDays(newWeekDays);
      } catch (error) {
        console.error("Error fetching work days:", error);
      }
    };
    fetchWorkDays();
  }, [currentDate]);

  const loadDays = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7
    );
    setCurrentDate(newDate);
  };

  const returnDays = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );
    if (
      newDate.getDate() >= dataRef.getDate() || (newDate.getDate() <= dataRef.getDate() && newDate.getMonth() > dataRef.getMonth() )
    ) {
      setCurrentDate(newDate);
    }
  };

  const getWeekDays = (date, dayNumbers) => {
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
        normal : dayToAdd.toLocaleString("pt-BR").split(" ").at(0)
      });
    });
    return days;
  };

  return (
    <div>
      <h2>Lista de Dias da Semana</h2>
      <ul>
        {weekDays.map((day) => (
          <li key={day.date}>
            <button onClick={() => props.setDay(day.normal)}>
              {day.weekDay} - {day.date}
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
