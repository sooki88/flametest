import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test1 from "./pages/Test1";
import Test2 from "./pages/Test2";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </Router>
  );
}
