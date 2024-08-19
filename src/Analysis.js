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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Analysis for Discord ID: {userID}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data */}
    </div>
  );
};

export default Analysis;
