import React from "react";
import { useState } from "react";
import Scheduler from "./Scheduler";


function MainPage() {
  const [escolha, setEscolha] = useState(true);
  const [data, setData] = useState("")
 
  
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
            </h2>
        ) : (
        <div>
            <Scheduler horaInicio="08:00" horaFim="13:30" intervalo="30" horaInicioTarde="16:00" horaFimTarde="22:00" setData={setData} />
            Foi escolhido os serviço
        </div>
        )

        }
        <div>
          {data}
        </div>
        <button onClick={nextOp}>Mostrar Horarios </button>
        
      </div>
    </>
  );
}

export default MainPage;
