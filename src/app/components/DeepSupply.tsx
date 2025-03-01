"use client";

import { useState, useEffect } from "react";

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
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 DEEP Token Burn Tracker 🔥</h2>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Fetching supply data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-xl font-semibold text-blue-300">
            <strong>Total Supply:</strong> {totalSupply?.toLocaleString()}
          </p>
          <p className="text-lg font-medium text-red-400 mt-2">
            <strong>Burned DEEP:</strong> {burnedAmount?.toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
};

export default DeepSupply;