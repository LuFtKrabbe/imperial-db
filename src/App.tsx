import "./App.css";
import DataManager from "./components/dataManager/DataManager";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <DataManager />
    </ErrorBoundary>
  );
}

export default App;
