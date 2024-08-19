import React, { useState, useEffect } from "react";
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
  const [recentlyAnalyzed, setRecentlyAnalyzed] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userID) {
      // Navigate to the analysis page
      navigate(`/analysis/${userID}`);

      // Update the recently analyzed list (you might save this to a database in a real app)
      setRecentlyAnalyzed((prev) => [userID, ...prev].slice(0, 5)); // Keep only the last 5 entries
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7289DA] to-[#5865F2] text-white">
      <div className="flex flex-col items-center w-full max-w-md p-8 bg-white bg-opacity-10 rounded-lg shadow-lg">
        <p className="text-3xl font-bold mb-6">check your discord aura!</p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            type="text"
            value={userID}
            placeholder="Enter your Discord ID"
            onChange={(e) => setUserID(e.target.value)}
            className="mb-4 p-3 rounded-lg border-none text-black placeholder-gray-500 shadow-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#5865F2] hover:bg-[#7289DA] text-white font-bold py-3 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Analyze Aura
          </button>
        </form>
      </div>

      <div className="mt-12 w-full max-w-md p-4 bg-white bg-opacity-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Recently Analyzed Users</h2>
        {recentlyAnalyzed.length > 0 ? (
          <ul className="list-disc list-inside text-white">
            {recentlyAnalyzed.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        ) : (
          <p>No users have been analyzed yet.</p>
        )}
      </div>
    </main>
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
