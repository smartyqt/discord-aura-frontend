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
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#7289DA] to-[#5865F2] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#7289DA] to-[#5865F2] text-white p-4">
      {data ? (
        <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* User Info */}
          <div className="flex flex-col items-center">
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

          {/* Aura Analysis */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Aura Points:</span>
              <span className="text-lg font-bold text-red-400">
                {data.aura.totalAuraScore}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Name Score:</span>
              <span className="text-lg font-bold text-red-400">
                {data.aura.nameScore}%
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Bio Score:</span>
              <span className="text-lg font-bold text-red-400">
                {data.aura.bioScore}%
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Follow Ratio:</span>
              <span className="text-lg font-bold text-red-400">
                {data.aura.followRatioScore}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Algo Pull:</span>
              <span className="text-lg font-bold text-red-400">
                {data.aura.algoPullScore}%
              </span>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold">Overall Aura Rating:</h3>
            <p className="text-3xl font-bold text-red-400">
              {data.aura.overallScore}
            </p>
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
