import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Analysis = () => {
  const { userID } = useParams(); // Extract userID from the URL
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for userID:", userID);
        const response = await axios.post(
          "http://localhost:3000/api/get-user-info", // Backend endpoint
          { userID } // Send the userID in the request body
        );
        const jsonData = response.data;
        setTimeout(() => {
          setData(jsonData);
          setLoading(false);
        }, 1000); // Simulate a 2-second delay
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#7289DA] to-[#5865F2] text-white">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 100-16v4a4 4 0 110 8v4z"
          ></path>
        </svg>
        <p className="mt-4 text-xl">analyzing aura</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#7289DA] to-[#5865F2] text-white p-4">
      {data ? (
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={data.userData.banner}
              alt="User Banner"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <img
              src={data.userData.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-red-400 mb-4"
            />

            <h1 className="text-3xl font-bold mb-2">
              @{data.userData.username}
            </h1>
            <p className="text-lg text-gray-300">
              Discord ID: {data.userData.username}
            </p>
          </div>

          {/* Displaying aura results */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Name</h3>
            <p>{data.userData.name}</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg">
          No data found for the user with ID: {userID}
        </div>
      )}
    </div>
  );
};

export default Analysis;
