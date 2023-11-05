import "./App.css";
import DataManager from "./components/dataManager/dataManager";
import DetailedCard from "./components/detailedCard/DetailedCard";
import ErrorBoundary from "./components/ErrorBoundary";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<DataManager />}>
          <Route path="card/*" element={<DetailedCard />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
