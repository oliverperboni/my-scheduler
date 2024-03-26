import React from "react";
import { useState } from "react";
import Scheduler from "./Scheduler";
import DaysList from "./DaysList";
import Employee from "./Employee";
import Services from "./Services";

function MainPage() {
  const [escolha, setEscolha] = useState(true);
  const [data, setData] = useState("")
  const [day, setDay] = useState("")
 
  
  function nextOp(){
    setEscolha(!escolha)
  }
  return (
    <>
      <div>
      <h2>MainPage</h2>
        {escolha  ? (
            <h2>
                Escolha os serviço
                <DaysList setDay={setDay}/>
            </h2>
        ) : (
        <div>
            <Scheduler horaInicio="08:00" horaFim="13:30" intervalo="30" horaInicioTarde="16:00" horaFimTarde="22:00" setData={setData} />
            Foi escolhido os serviço
        </div>
        )

        }
        <div>
          <Employee/>
          <Services/>
        </div>
        <button onClick={nextOp}>Mostrar Horarios </button>
        { day !== "" && data !== ""  && (<div> O horario escolhido foi {data} e o dia foi {day} </div>)}

      </div>
    </>
  );
}

export default MainPage;
