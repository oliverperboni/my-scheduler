import React from "react";
import { useState } from "react";
import Scheduler from "./Scheduler";
import DaysList from "./DaysList";
import Employee from "./Employee";
import Services from "./Services";
import axios from "axios";

function MainPage() {
  // const [escolha, setEscolha] = useState(true);
  // const [escolha1, setEscolha1] = useState(true);
  const [data, setData] = useState("");
  const [day, setDay] = useState("");
  const [employee,setEmployee] = useState("")
  const [service,setService] = useState("")
  const [showMarcarButton, setShowMarcarButton] = useState(false);
  const [currentPage, setCurrentPage] = useState("Service");

  const nextPage = () => {
    switch (currentPage) {
      case "Service":
        setCurrentPage("Employee");
        break;
      case "Employee":
        setCurrentPage("DayList");
        break;
      case "DayList":
        setShowMarcarButton(true);
        setCurrentPage("Scheduler");
        break;
      default:
        break;
    }
  };

  const sendAppointment = () => {
    let dados = JSON.stringify({
      "employee": {
        "id": employee
      },
      "service": {
        "id": service
      },
      "user": {
        "id": 2
      },
      "date": day,
      "time": data,

    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/v1/appointment',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dados
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    setCurrentPage("Service")
  }

  const prevPage = () => {
    switch (currentPage) {
      case "Scheduler":
        setCurrentPage("DayList");
        break;
      case "DayList":
        setCurrentPage("Employee");
        break;
      case "Employee":
        setCurrentPage("Service");
        break;
      default:
        break;
    }
  };

  const renderComponent = () => {
    switch (currentPage) {
      case "Service":
        return <Services setService={setService} />;
      case "Employee":
        return <Employee setEmployee={setEmployee} />;
      case "DayList":
        return <DaysList setDay={setDay} />;
      case "Scheduler":
        return (
          <Scheduler
            employee={employee}
            horaInicio="08:00"
            horaFim="13:30"
            intervalo="30"
            horaInicioTarde="16:00"
            horaFimTarde="22:00"
            setData={setData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderComponent()}
      <button onClick={prevPage} disabled={currentPage === "Service"}>
        Previous
      </button>
      {currentPage !== 'Scheduler' && <button onClick={nextPage}>Next</button>}
      {showMarcarButton && <button onClick={sendAppointment}>Marcar</button>}
      dia:{day} data: {data} employee: {employee}  service: {service}
    </div>
  );
}

export default MainPage;
