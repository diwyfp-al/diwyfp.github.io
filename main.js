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

// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileMenuLinks = mobileMenu.querySelectorAll('[data-mobile-menu-link]');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Toggle visibility of the menu
            menuIconOpen.classList.toggle('hidden'); // Toggle between open/close icon
            menuIconClose.classList.toggle('hidden');
            // Prevent scrolling on the body when mobile menu is open
            document.body.classList.toggle('overflow-hidden');
        });

        // Close mobile menu when a link inside it is clicked
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Hide the menu
                menuIconOpen.classList.remove('hidden'); // Show hamburger icon
                menuIconClose.classList.add('hidden'); // Hide close icon
                document.body.classList.remove('overflow-hidden'); // Re-enable body scroll
            });
        });
    }

// Run after the page loads
window.addEventListener('load', () => {
  showNextMessage();
  lucide.createIcons();
  history.replaceState(null, '', location.pathname);
  window.scrollTo(0, 0);
});
