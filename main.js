document.addEventListener('DOMContentLoaded', () => {
    // --- Hero message animation ---
    const messages = [
        "You can do-it-yourself (DIY)",
        "You can do-it-yourself (DIY)",
        "You can let someone do-it-for-you (DIFY)",
        "You can let someone do-it-for-you (DIFY)",
        "or ...",
        "You can let someone do-it-with-you (DIWY)",
        "Collaborative, Holistic, Modular and On-Demand"
    ];

    const delays = [3000, 2000, 3000, 2000, 3000, 4000, 10000];
    let index = 0;
    let cycleCount = 0;
    const maxCycles = 5;

    function showNextMessage() {
        const container = document.getElementById("message-container");
        if (!container) {
            // If the container isn't found, log an error and stop trying
            console.error("Message container not found. Animation stopped.");
            return;
        }

        container.classList.remove("crossed");
        container.innerHTML = messages[index];

        if (index === 1 || index === 3) {
            container.classList.add("crossed");
        }

        setTimeout(() => {
            index++; // Move to the next message index
            if (index >= messages.length) {
                index = 0; // Reset index to loop
                cycleCount++; // Increment cycle count
            }

            if (cycleCount < maxCycles) {
                showNextMessage(); // Continue the animation if max cycles not reached
            } else {
                // Optional: What happens after maxCycles?
                // For example, set a final static message or just let the last one displayed remain.
                // If you want it to loop indefinitely, remove 'maxCycles' and this 'else' block.
            }
        }, delays[index]); // Use the delay for the *current* message
    }

    // Initialize the rotating message only if the container exists
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        showNextMessage(); // <--- This call must be inside DOMContentLoaded
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileMenuLinks = mobileMenu.querySelectorAll('[data-mobile-menu-link]');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden');
            menuIconClose.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // --- Initialize Lucide Icons ---
    // Make sure Lucide is loaded before trying to create icons
    // This assumes the <script src="https://unpkg.com/lucide@latest"></script>
    // is placed *before* your main.js script in index.html
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // --- REMOVE THIS CODE ---
    // This was the problematic code for jump links.
    // history.replaceState(null, '', location.pathname);
    // window.scrollTo(0, 0);
});
