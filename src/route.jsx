import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privateroute from "./Privateroute";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Sigin from "./pages/Sigin";
import Alunos from "./pages/Alunos";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/Teachers";
import DashTeachers from "./pages/DashTeachers";

const RouteConfig = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teste" element={<HomePage />} />
      <Route path="/secretaria" element={<Admin />} />
      <Route path="/centraldoaluno" element={<Alunos />} />
      <Route path="/centraldosprofessores" element={<Teachers />} />
      <Route path="/admin-logado" element={<Privateroute><Sigin /></Privateroute>} />
      <Route path="/dashboard" element={<Privateroute><Dashboard /></Privateroute>} />
      <Route path="/loginteachers" element={<Privateroute><DashTeachers /></Privateroute>} />
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
