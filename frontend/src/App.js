import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import WatchCapsules from "./pages/WatchCapsules";
import CreateCapsule from "./pages/CreateCapsule";
import CapsuleDetail from "./pages/CapsuleDetail";
import NavBar from "./pages/NavBar"; // NavBar import
import './App.css';

// Protected route wrapper
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

// Wrapper to conditionally show NavBar
const AppWrapper = () => {
  const location = useLocation();
  const hideNavBarPaths = ["/", "/login", "/signup"];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/watch-capsules"
          element={
            <PrivateRoute>
              <WatchCapsules />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-capsule"
          element={
            <PrivateRoute>
              <CreateCapsule />
            </PrivateRoute>
          }
        />
        <Route
          path="/capsule/:id"
          element={
            <PrivateRoute>
              <CapsuleDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
