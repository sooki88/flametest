import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test1 from "./pages/Test1";
import Test2 from "./pages/Test2";
import Home from "./pages/Home";
import Test2HTML from "./pages/Test2HTML";
import Test2Formik from "./pages/Test2Formik";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test2HTML" element={<Test2HTML />} />
        <Route path="/test2Formik" element={<Test2Formik />} />
      </Routes>
    </Router>
  );
}
