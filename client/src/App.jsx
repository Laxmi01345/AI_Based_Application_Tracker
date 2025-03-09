import { useState, useEffect } from "react";
import Form from "./components/Form.jsx";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {HashLoader} from "react-spinners"
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login/success`;

      const { data } = await axios.get(url, { withCredentials: true });
      localStorage.setItem("userEmail", data.user.email);
      console.log("Full API response:", data); // Debugging
    console.log("User object:", data.user);  // Check if user exists

    if (data.user) {
      setUser(data.user); // Use data.user directly
    } else {
      console.error("User data is missing from the response.");
    }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<Form />} />

          <Route
            path="/dashboard"
            element={
              loading ? (
                <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <HashLoader loading={true} color="#36d7b7" size={60} />
      </div>
              ) : user ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
