// pages/location.tsx
"use client";
import { useEffect } from "react";

const Location: React.FC = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;

          // Log the achieved coordinates to the console
          console.log(
            `Achieved Coordinates: Latitude: ${latitude}, Longitude: ${longitude}`
          );

          // Send the position data to the server
          fetch("/api/save-location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          });
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Click allow</h1>
    </div>
  );
};

export default Location;
