import "./App.css";
import DataManager from "./components/dataManager/dataManager";
import ErrorBoundary from "./components/ErrorBoundary";

import { Routes, Route } from "react-router-dom";

function App() {
  console.log("App is loaded");
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<DataManager />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
