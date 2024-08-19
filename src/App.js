import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Analysis from "./Analysis";
import "./App.css";

function Home() {
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userID) {
      navigate(`/analysis/${userID}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-bold">Get your Discord aura analyzed</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={userID}
          placeholder="Discord ID"
          onChange={(e) => setUserID(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis/:userID" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
