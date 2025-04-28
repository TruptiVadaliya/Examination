import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import CreateTest from "./components/CreateTest";
import UserDashboard from "./components/UserDashboard";
import TakeTest from "./components/TakeTest";
import ResultPage from "./components/ResultPage";

const App = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            currentUser?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/create-test"
          element={
            currentUser?.role === "admin" ? (
              <CreateTest />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-dashboard"
          element={
            currentUser?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/take-test/:id" element={<TakeTest />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
