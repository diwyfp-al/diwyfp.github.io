const baseFee = 500;
const discounts = [0, 0.25, 0.375, 0.5]; // 1st full, 2nd 25% off, etc.

function updatePricing() {
  const input = document.getElementById("meetings");
  const numMeetings = parseInt(input.value) || 1;

  let total = 0;
  for (let i = 0; i < numMeetings; i++) {
    const discount = discounts[i] !== undefined ? discounts[i] : discounts[3];
    total += baseFee * (1 - discount);
  }

  const avg = total / numMeetings;

  document.getElementById("totalFee").textContent = `Total Fee: $${total.toFixed(2)}`;
  document.getElementById("avgFee").textContent = `Average per Meeting: $${avg.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", updatePricing);