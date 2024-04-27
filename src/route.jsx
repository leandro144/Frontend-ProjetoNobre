
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privateroute from "./Privateroute"; // Corrigido para usar import padrão

import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Sigin from "./pages/Sigin";
import Alunos from "./pages/Alunos";
import Dashboard from "./pages/Dashboard";

const RouteConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="https://colegionobre.netlify.app/secretaria" element={<Admin />} />
      <Route path="https://colegionobre.netlify.app/centraldoaluno" element={<Alunos />} />
      <Route path="https://colegionobre.netlify.app/admin-logado" element={<Privateroute><Sigin /></Privateroute>} />
      <Route path="https://colegionobre.netlify.app/dashboard" element={<Privateroute><Dashboard /></Privateroute>} />
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
