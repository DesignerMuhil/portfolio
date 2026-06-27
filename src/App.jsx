import { Routes, Route } from "react-router-dom";

import Cursor from "./Components/Cursor";
import ThemeToggle from "./components/ThemeToggle";

import Home from "./pages/Home";
import JuristBotCaseStudy from "./pages/JuristBotCaseStudy";
import DiginestCaseStudy from "./pages/DiginestCaseStudy";

function App() {
  return (
    <>
      <Cursor />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience/diginest" element={<DiginestCaseStudy />} />
        <Route path="/experience/juristbot" element={<JuristBotCaseStudy />} />
        
      </Routes>
    </>
  );
}

export default App;