import React, { useState } from "react";
import "./App.css"; // For any global or additional custom styles

function App() {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-bold">get your discord aura analyzed</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={username}
          placeholder="discord id"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
