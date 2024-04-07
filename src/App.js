import logo from "./logo.svg";
import "./App.css";
import VesselNav from "./components/VesselNav";

function App() {
  return (
    <div className="App">
      <VesselNav
        startCoords={startCoords}
        endCoords={endCoords}
        speedKmph={speedKmph}
        screenRefreshRate={screenRefreshRate}
      />
    </div>
  );
}

export default App;
