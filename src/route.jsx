// route.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import Students from "./pages/Students";
import Dashboard from "./pages/Dashboard";

const RouteConfig = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teste" element={<HomePage />} />
      <Route path="/secretaria" element={<Admin />} />
      <Route path="/centraldoaluno" element={<Students />} />
      <Route path="/admin-logado" element={<PrivateRoute><SignIn /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
