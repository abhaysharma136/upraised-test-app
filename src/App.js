import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import Report from "./pages/Report";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
