import FeeCalculator from "./FeeCalculator";
import { useState } from "react";

export default function ServicesPage() {
  const [baseFee, setBaseFee] = useState(600);
  const [discounts, setDiscounts] = useState([0.25, 0.375, 0.5]);

  const adjustBaseFee = (delta) => setBaseFee(Math.max(0, baseFee + delta));
  const adjustDiscount = (index, delta) => {
    const newDiscounts = [...discounts];
    newDiscounts[index] = Math.min(1, Math.max(0, newDiscounts[index] + delta));
    setDiscounts(newDiscounts);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        <p className="text-lg">
          At DIWY Planning, we walk alongside you on your financial journey. Whether you're
          building wealth for the first time, transitioning from a DIY approach, or seeking
          a trusted co-pilot, our flat-fee, advice-only model is designed to meet you where
          you are. No commissions, no assets under management, just clear, personalized guidance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>One-on-one financial planning sessions (virtual or in-person)</li>
          <li>Budgeting, debt strategy, and savings plans</li>
          <li>Investment and retirement planning for first-generation wealth builders</li>
          <li>Cash flow planning and milestone-based goal setting</li>
          <li>Support with major financial decisions (home purchase, career changes, etc.)</li>
          <li>Flat-fee pricing with no hidden costs or long-term commitments</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Simple, Transparent Pricing</h2>
        <p className="text-lg mb-4">
          Our pricing is based on the number of meetings you need. The first meeting is billed
          at the full base rate. Each subsequent meeting receives a discount to reflect your
          growing confidence and clarity.
        </p>

        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              <div>
                <label className="font-medium">Base Fee: ${baseFee}</label>
                <div className="flex items-center space-x-2 mt-1">
                  <button onClick={() => adjustBaseFee(-50)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <button onClick={() => adjustBaseFee(50)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
              </div>
              {discounts.map((discount, i) => (
                <div key={i}>
                  <label className="font-medium">Discount {i + 2}: {(discount * 100).toFixed(1)}%</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <button onClick={() => adjustDiscount(i, -0.05)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <button onClick={() => adjustDiscount(i, 0.05)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
              ))}
              <FeeCalculator baseFee={baseFee} discounts={[0, ...discounts]} />
              <p className="text-sm text-gray-500">
                * Pricing calculator estimates are based on your base rate and current discount structure.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-2">Meeting Cost Estimates (1–6 sessions)</h3>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border-b">Meetings</th>
                  <th className="p-2 border-b">Total Fee</th>
                  <th className="p-2 border-b">Per Meeting</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((n) => {
                  let total = 0;
                  for (let i = 0; i < n; i++) {
                    const d = (i === 0) ? 0 : (discounts[i - 1] || discounts[discounts.length - 1]);
                    total += baseFee * (1 - d);
                  }
                  const avg = total / n;
                  return (
                    <tr key={n}>
                      <td className="p-2 border-b text-center">{n}</td>
                      <td className="p-2 border-b text-center">${total.toFixed(2)}</td>
                      <td className="p-2 border-b text-center">${avg.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Ready to Plan with a Pro?</h2>
        <p className="text-lg mb-4">
          Book your first meeting or contact us to learn more. We're here to help you turn uncertainty into
          action, and action into confidence.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}