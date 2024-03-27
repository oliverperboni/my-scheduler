import React from "react";
import { useState } from "react";
import Scheduler from "./Scheduler";
import DaysList from "./DaysList";
import Employee from "./Employee";
import Services from "./Services";

function MainPage() {
  // const [escolha, setEscolha] = useState(true);
  // const [escolha1, setEscolha1] = useState(true);
  const [data, setData] = useState("");
  const [day, setDay] = useState("");
  const [showMarcarButton, setShowMarcarButton] = useState(false);

  // function nextOp() {
  //   setEscolha(!escolha);
  // }
  // function nextOp1() {
  //   setEscolha1(!escolha1);
  // }
  // return (
  //   <>
  //     <div>
  //       <h2>MainPage</h2>
  //       {escolha1 ? (
  //         <div>

  //           <Services />
  //           <button onClick={nextOp1}>Proximo</button>
  //         </div>
  //       ) : (
  //         <div>

  //           <Employee />
  //           <button onClick={nextOp1}>Voltar</button>
  //         </div>
  //       )}
  //       {escolha ? (
  //         <div>
  //           <h2>
  //             <DaysList setDay={setDay} />
  //           </h2>
  //           <button onClick={nextOp}>Mostrar Horarios </button>
  //         </div>
  //       ) : (
  //         <div>
  // <Scheduler
  //   horaInicio="08:00"
  //   horaFim="13:30"
  //   intervalo="30"
  //   horaInicioTarde="16:00"
  //   horaFimTarde="22:00"
  //   setData={setData}
  // />
  //           <button onClick={nextOp}>Voltar</button>
  //         </div>
  //       )}
  //       <div></div>
  //       <button onClick={nextOp}>Mostrar Horarios </button>
  //       {day !== "" && data !== "" && (
  //         <div>
  //           {" "}
  //           O horario escolhido foi {data} e o dia foi {day}{" "}
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

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
        return <Services />;
      case "Employee":
        return <Employee />;
      case "DayList":
        return <DaysList setDay={setDay} />;
      case "Scheduler":
        return (
          <Scheduler
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
      {showMarcarButton && <button>Marcar</button>}

    </div>
  );
}

export default MainPage;
