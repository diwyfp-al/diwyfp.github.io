import { useState, useEffect } from "react";

export default function FeeCalculator({ baseFee, discounts }) {
  const [numMeetings, setNumMeetings] = useState(4);
  const [totalFee, setTotalFee] = useState(0);
  const [averageFee, setAverageFee] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < numMeetings; i++) {
      const discount = discounts[i] !== undefined ? discounts[i] : discounts[discounts.length - 1];
      total += baseFee * (1 - discount);
    }
    setTotalFee(total);
    setAverageFee(total / numMeetings);
  }, [numMeetings, baseFee, discounts]);

  return (
    <div className="border rounded-xl p-4 shadow max-w-xs">
      <label htmlFor="meetings" className="block font-medium text-sm mb-2">Number of Meetings:</label>
      <div className="flex items-center space-x-2 mb-3">
        <button
          onClick={() => setNumMeetings((prev) => Math.max(1, prev - 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={numMeetings}
          className="text-center w-12 border rounded px-2 py-1"
        />
        <button
          onClick={() => setNumMeetings((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
      <div className="text-sm font-medium space-y-1">
        <p>Total Fee: ${totalFee.toFixed(2)}</p>
        <p>Average per Meeting: ${averageFee.toFixed(2)}</p>
      </div>
    </div>
  );
}