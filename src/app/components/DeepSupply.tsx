"use client";

import { useState, useEffect } from "react";
import LearnAboutDeep from "./LearnAboutDeep";
import MadeWithLove from "./MadeWithLove";

const TOTAL_SUPPLY_START = 10_000_000_000; // 🔥 Fixed Initial Supply (10 Billion)

const DeepSupply = () => {
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [burnedAmount, setBurnedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalSupply = async () => {
      try {
        const response = await fetch("/api/deepSupply");
        const data = await response.json();

        if (data && data.totalSupply) {
          // ✅ Fix: Ensure correct unit handling
          const currentSupply = Math.floor(Number(data.totalSupply) / 1_000_000); // Convert to Million
          const burned = TOTAL_SUPPLY_START - currentSupply;

          setTotalSupply(currentSupply);
          setBurnedAmount(burned);
        } else {
          throw new Error("Invalid data from API");
        }
      } catch (err) {
        console.error("❌ Error fetching DEEP token supply:", err);
        setError("Failed to fetch DEEP supply data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSupply(); // ✅ Calls API once when component mounts
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen w-full z-10 space-y-6 p-6">
    {/* Learn About DEEP Box - Above */}
    <LearnAboutDeep />

    {/* Token Supply Tracker - Middle */}
    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 backdrop-blur-lg p-8 text-white rounded-2xl shadow-xl text-center max-w-md transition transform hover:scale-105">
      <h2 className="text-3xl font-extrabold mb-4 text-white drop-shadow-lg">
        DEEP Token Supply
      </h2>
      {loading ? (
        <p className="text-gray-400 animate-pulse">Fetching supply data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-2xl font-bold text-green-200 drop-shadow-sm">
            <strong>Supply:</strong> {totalSupply?.toLocaleString()}
          </p>
            <p className="text-xl font-semibold text-red-400 mt-3 drop-shadow-sm">
            <strong>🔥 DEEP:</strong> {burnedAmount?.toLocaleString()}
          </p>
        </>
      )}
    </div>
      {/* Made with Love Box - Below */}
      <MadeWithLove />
  </div>
  );
};

export default DeepSupply;