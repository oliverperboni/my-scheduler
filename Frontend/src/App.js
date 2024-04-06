import ClientAppointments from "./components/ClientAppointments";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
  //  <Scheduler horaInicio="08:00" horaFim="13:30" intervalo="30" horaInicioTarde="16:00" horaFimTarde="22:00"/>
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage/>
        </Route>
        <Route path="/appointment">
          <ClientAppointments clientId={1}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;


