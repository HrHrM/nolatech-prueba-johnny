import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import EvaluationDetailPage from "./pages/evaluation-detail";
import Profile from "./pages/employee-profile";
import Evaluations from "./pages/evaluations";
import HomePage from "./pages/home";
import Register from "./pages/register";
import Results from "./pages/results";
import EvaluationsAll from "./pages/evaluation-all";

function App() {
  console.log("### PHOS STARTED");
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/evaluations/employee/" element={<Evaluations />} />
        <Route path="/general-evaluations" element={<EvaluationsAll />} />
        <Route path="/results-graphs" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/evaluation/" element={<EvaluationDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
