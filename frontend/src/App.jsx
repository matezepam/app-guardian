import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Tips from "./pages/Tips";
import TipDetail from "./pages/TipDetail/TipDetail";

import Impact from "./pages/Impact";
import ImpactPost from "./pages/Impact/ImpactPost";

import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Profile/Settings";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">

          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/tips/:slug" element={<TipDetail />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/impact/:slug" element={<ImpactPost />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>

          <Footer />

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
