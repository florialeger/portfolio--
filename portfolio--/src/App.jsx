import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Playground from "./pages/Playground";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
