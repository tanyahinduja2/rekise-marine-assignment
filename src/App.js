import logo from "./logo.svg";
import "./App.css";
import VesselNav from "./components/VesselNav";
function App() {
  const startCoords = [22.1696, 91.4996];
  const endCoords = [22.2637, 91.7159];
  const speedKmph = 2000;
  const screenRefreshRate = 2; // FPS
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
