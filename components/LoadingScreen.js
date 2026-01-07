"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LoadingScreen = ({ isLoading }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/assets/images/infinite-loader.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-animation-container">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "400px", height: "400px" }}
          />
        )}
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }

        .loading-animation-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .loading-animation-container {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
