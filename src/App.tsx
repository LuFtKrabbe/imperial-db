import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./pages/main/Main";
import CtrlForm from "./pages/forms/CtrlForm";
import UnCtrlForm from "./pages/forms/UnCtrlForm";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/controlled" element={<CtrlForm />} />
        <Route path="/uncontrolled" element={<UnCtrlForm />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
