
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privateroute from "./Privateroute";

import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Sigin from "./pages/Sigin";
import Alunos from "./pages/Alunos";
import Dashboard from "./pages/Dashboard";

const RouteConfig = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teste" element={<HomePage />} />
      <Route path="/secretaria" element={<Admin />} />
      <Route path="/centraldoaluno" element={<Alunos />} />
      <Route path="/admin-logado" element={<Privateroute><Sigin /></Privateroute>} />
      <Route path="/dashboard" element={<Privateroute><Dashboard /></Privateroute>} />
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
