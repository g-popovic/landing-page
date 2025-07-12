// Store original text content
let originalTitleText = "";
let originalSubtitleText = "";

// Create animated stars for hero section
function createHeroStars() {
	const heroStarsContainer = document.getElementById("heroStars");
	if (!heroStarsContainer) return;

	const starCount = 40;

	for (let i = 0; i < starCount; i++) {
		const star = document.createElement("div");
		star.className = "hero-star";

		// Random starting position around the edges
		const side = Math.floor(Math.random() * 4);
		let x, y;

		switch (side) {
			case 0: // top
				x = Math.random() * 100;
				y = -5;
				break;
			case 1: // right
				x = 105;
				y = Math.random() * 100;
				break;
			case 2: // bottom
				x = Math.random() * 100;
				y = 105;
				break;
			case 3: // left
				x = -5;
				y = Math.random() * 100;
				break;
		}

		star.style.left = x + "%";
		star.style.top = y + "%";
		star.style.animationDelay = Math.random() * 3 + "s";
		star.style.opacity = Math.random() * 0.6 + 0.3;

		heroStarsContainer.appendChild(star);
	}
}

// Setup layout-preserving word loading structure
function setupWordLoading(element, text) {
	// Create invisible placeholder to reserve exact space
	const placeholder = document.createElement("div");
	placeholder.className = "text-placeholder";
	placeholder.textContent = text;

	// Create overlay for word-by-word loading
	const overlay = document.createElement("div");
	overlay.className = "word-overlay";

	// Clear original content and add our structure
	element.innerHTML = "";
	element.appendChild(placeholder);
	element.appendChild(overlay);

	// Store reference to overlay for later use
	element.wordOverlay = overlay;
}

// Word-by-word loading effect
function wordByWordLoader(element, text, wordDelay = 100) {
	if (!element || !element.wordOverlay) return;

	const words = text.split(" ");
	const overlay = element.wordOverlay;
	overlay.innerHTML = "";

	words.forEach((word, index) => {
		const wordSpan = document.createElement("span");
		wordSpan.className = "word";
		wordSpan.textContent = word;
		wordSpan.style.animationDelay = `${index * wordDelay}ms`;
		overlay.appendChild(wordSpan);

		// Add space after each word except the last one
		if (index < words.length - 1) {
			overlay.appendChild(document.createTextNode(" "));
		}
	});
}

// Initialize word-by-word text loading
function startWordByWordLoader() {
	const heroTitle = document.querySelector(".hero-title");
	const heroSubtitle = document.querySelector(".hero-subtitle");

	if (heroTitle) {
		originalTitleText = heroTitle.textContent;
		setupWordLoading(heroTitle, originalTitleText);
		wordByWordLoader(heroTitle, originalTitleText, 200);
	}

	if (heroSubtitle) {
		originalSubtitleText = heroSubtitle.textContent;
		setupWordLoading(heroSubtitle, originalSubtitleText);

		// Start subtitle loading after title has started
		setTimeout(() => {
			wordByWordLoader(heroSubtitle, originalSubtitleText, 50);
		}, 800);
	}
}

// Mobile Navigation
function initMobileNavigation() {
	const navToggle = document.querySelector(".nav-toggle");
	const navMenu = document.querySelector(".nav-menu");

	if (!navToggle || !navMenu) return;

	// Toggle mobile menu
	navToggle.addEventListener("click", () => {
		navMenu.classList.toggle("active");
	});

	// Close mobile menu when clicking on a link
	document.querySelectorAll(".nav-link").forEach(link => {
		link.addEventListener("click", () => {
			navMenu.classList.remove("active");
		});
	});

	// Close mobile menu when clicking outside
	document.addEventListener("click", e => {
		if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
			navMenu.classList.remove("active");
		}
	});
}

// Contact Form Handling
function initContactForm() {
	const contactForm = document.getElementById("contactForm");
	if (!contactForm) return;

	contactForm.addEventListener("submit", async e => {
		e.preventDefault();

		const formData = new FormData(contactForm);
		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			subject: formData.get("subject"),
			message: formData.get("message")
		};

		const submitButton = contactForm.querySelector('button[type="submit"]');
		const originalText = submitButton.textContent;

		// Show loading state
		submitButton.textContent = "Šalje se...";
		submitButton.disabled = true;

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			showNotification(
				"Vaša poruka je uspješno poslana! Odgovorićemo vam uskoro.",
				"success"
			);
			contactForm.reset();
		} catch (error) {
			showNotification(
				"Dogodila se greška prilikom slanja poruke. Molimo pokušajte ponovo.",
				"error"
			);
		} finally {
			submitButton.textContent = originalText;
			submitButton.disabled = false;
		}
	});
}

// Notification system
function showNotification(message, type = "info") {
	// Remove existing notification
	const existingNotification = document.querySelector(".notification");
	if (existingNotification) {
		existingNotification.remove();
	}

	// Create notification element
	const notification = document.createElement("div");
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

	// Style notification
	const bgColor = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6";
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInFromRight 0.3s ease-out;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

	// Add notification styles
	if (!document.getElementById("notification-styles")) {
		const style = document.createElement("style");
		style.id = "notification-styles";
		style.textContent = `
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                opacity: 0.8;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
		document.head.appendChild(style);
	}

	document.body.appendChild(notification);

	// Close button functionality
	const closeButton = notification.querySelector(".notification-close");
	closeButton.addEventListener("click", () => notification.remove());

	// Auto-remove after 5 seconds
	setTimeout(() => {
		if (notification.parentNode) {
			notification.remove();
		}
	}, 5000);
}

// Scroll animations
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px"
	};

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate-in");
			}
		});
	}, observerOptions);

	// Observe elements for animation
	const elementsToAnimate = document.querySelectorAll(
		".service-card, .portfolio-item, .process-step, .floating-card"
	);
	elementsToAnimate.forEach(el => observer.observe(el));
}

// Active navigation highlighting
function initActiveNavigation() {
	window.addEventListener("scroll", () => {
		const sections = document.querySelectorAll("section[id]");
		const navLinks = document.querySelectorAll(".nav-link");
		let currentSection = "";

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			if (window.scrollY >= sectionTop - 200) {
				currentSection = section.getAttribute("id");
			}
		});

		navLinks.forEach(link => {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${currentSection}`) {
				link.classList.add("active");
			}
		});
	});

	// Add active nav link styles
	if (!document.getElementById("nav-styles")) {
		const navStyles = document.createElement("style");
		navStyles.id = "nav-styles";
		navStyles.textContent = `
            .nav-link.active {
                color: #a855f7;
            }
            .nav-link.active::after {
                width: 100%;
            }
        `;
		document.head.appendChild(navStyles);
	}
}

// Parallax effects
function initParallaxEffects() {
	window.addEventListener("scroll", () => {
		const scrolled = window.pageYOffset;
		const parallaxElements = document.querySelectorAll(".floating-card");

		parallaxElements.forEach(element => {
			const rate = scrolled * -0.5;
			element.style.transform = `translateY(${rate}px)`;
		});
	});
}

// Enhanced hover effects
function initHoverEffects() {
	// Service cards
	document.querySelectorAll(".service-card").forEach(card => {
		card.addEventListener("mouseenter", () => {
			card.style.transform = "translateY(-10px) scale(1.02)";
		});
		card.addEventListener("mouseleave", () => {
			card.style.transform = "translateY(0) scale(1)";
		});
	});

	// Custom cursor
	document.addEventListener("mousemove", e => {
		let cursor = document.querySelector(".custom-cursor");
		if (!cursor) {
			cursor = document.createElement("div");
			cursor.className = "custom-cursor";
			cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: rgba(168, 85, 247, 0.8);
                border-radius: 50%;
                pointer-events: none;
                mix-blend-mode: difference;
                z-index: 9999;
                transition: all 0.3s ease;
            `;
			document.body.appendChild(cursor);
		}
		cursor.style.left = e.clientX - 10 + "px";
		cursor.style.top = e.clientY - 10 + "px";
	});
}

// Loading screen management
function initLoadingScreen() {
	const heroContainer = document.querySelector(".hero-container");
	if (!heroContainer) return;

	setTimeout(() => {
		heroContainer.style.display = "block";
		startWordByWordLoader();
	}, 1500);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	initMobileNavigation();
	initContactForm();
	initScrollAnimations();
	initActiveNavigation();
	initParallaxEffects();
	initHoverEffects();
});

// Initialize loading screen when everything is loaded
window.addEventListener("load", () => {
	createHeroStars();
	initLoadingScreen();
});
