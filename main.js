// Hero message animation
const messages = [
  "You can do-it-yourself (DIY)",
  "You can do-it-yourself (DIY)",
  "You can let someone do-it-for-you (DIFY)",
  "You can let someone do-it-for-you (DIFY)",
  "or ...",
  "You can let us do-it-with-you (DIWY)",
  "Collaborative, Holistic, Modular and On-Demand"
];

const delays = [3000, 2000, 3000, 2000, 3000, 4000, 10000];
let index = 0;
let cycleCount = 0;
const maxCycles = 5;

function showNextMessage() {
  const container = document.getElementById("message-container");
  if (!container) return;
  container.classList.remove("crossed");
  container.innerHTML = messages[index];

  if (index === 1 || index === 3) {
    container.classList.add("crossed");
  }

  setTimeout(() => {
    index = (index + 1) % messages.length;
    if (index === 0) cycleCount++;
    if (cycleCount < maxCycles) showNextMessage();
  }, delays[index]);
}

// Run after the page loads
window.addEventListener('load', () => {
  showNextMessage();
  lucide.createIcons();
  history.replaceState(null, '', location.pathname);
  window.scrollTo(0, 0);
});
