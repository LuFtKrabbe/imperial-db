import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/main/Main";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
