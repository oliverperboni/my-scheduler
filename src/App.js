import Scheduler from "./components/Scheduler";
function App() {
  return (
   <Scheduler inicio="08:00" fim="12:00" intervalo={30} />
  );
}

export default App;
