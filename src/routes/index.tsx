import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Habit from "../pages/Habit";
import HabitToday from "../pages/HabitToday";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route
          path="/habitos"
          element={
            <PrivateRoute>
              <Habit />
            </PrivateRoute>
          }
        />
        <Route
          path="/hoje"
          element={
            <PrivateRoute>
              <HabitToday />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
