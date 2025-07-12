const MAIN_CONTENT_LOAD_DELAY = 1500;

// Create animated stars for hero section
function createHeroStars() {
	const heroStarsContainer = document.getElementById("heroStars");
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

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

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

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async e => {
	e.preventDefault();

	const formData = new FormData(contactForm);
	const data = {
		name: formData.get("name"),
		email: formData.get("email"),
		subject: formData.get("subject"),
		message: formData.get("message")
	};

	// Get the submit button
	const submitButton = contactForm.querySelector('button[type="submit"]');
	const originalText = submitButton.textContent;

	// Show loading state
	submitButton.textContent = "Šalje se...";
	submitButton.disabled = true;

	try {
		// Here you would typically send the data to your server
		// For now, we'll just simulate a successful submission
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Show success message
		showNotification("Vaša poruka je uspješno poslana! Odgovorićemo vam uskoro.", "success");

		// Reset form
		contactForm.reset();
	} catch (error) {
		// Show error message
		showNotification(
			"Dogodila se greška prilikom slanja poruke. Molimo pokušajte ponovo.",
			"error"
		);
	} finally {
		// Reset button state
		submitButton.textContent = originalText;
		submitButton.disabled = false;
	}
});

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

	// Add styles
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInFromRight 0.3s ease-out;
    `;

	// Add animation styles
	const style = document.createElement("style");
	style.textContent = `
        @keyframes slideInFromRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
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
	document.body.appendChild(notification);

	// Close button functionality
	const closeButton = notification.querySelector(".notification-close");
	closeButton.addEventListener("click", () => {
		notification.remove();
	});

	// Auto-remove after 5 seconds
	setTimeout(() => {
		if (notification.parentNode) {
			notification.remove();
		}
	}, 5000);
}

// Smooth reveal animations on scroll
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

// Add active navigation highlighting
window.addEventListener("scroll", () => {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nav-link");

	let currentSection = "";

	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;

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
const navStyles = document.createElement("style");
navStyles.textContent = `
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

document.head.appendChild(navStyles);

// Parallax effect for hero section
window.addEventListener("scroll", () => {
	const scrolled = window.pageYOffset;
	const parallaxElements = document.querySelectorAll(".floating-card");

	parallaxElements.forEach((element, index) => {
		const rate = scrolled * -0.5;
		element.style.transform = `translateY(${rate}px)`;
	});
});

// Add hover effects to service cards
document.querySelectorAll(".service-card").forEach(card => {
	card.addEventListener("mouseenter", () => {
		card.style.transform = "translateY(-10px) scale(1.02)";
	});

	card.addEventListener("mouseleave", () => {
		card.style.transform = "translateY(0) scale(1)";
	});
});

// Store original text content
let originalTitleText = "";
let originalSubtitleText = "";

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

// Word-by-word loading effect for hero title
function wordByWordLoader(element, text, wordDelay = 100) {
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

function startWordByWordLoader() {
	// Store original text and create layout-preserving setup
	const heroTitle = document.querySelector(".hero-title");
	const heroSubtitle = document.querySelector(".hero-subtitle");

	if (heroTitle) {
		originalTitleText = heroTitle.textContent;
		setupWordLoading(heroTitle, originalTitleText);
	}

	if (heroSubtitle) {
		originalSubtitleText = heroSubtitle.textContent;
		setupWordLoading(heroSubtitle, originalSubtitleText);
	}

	if (heroTitle) {
		wordByWordLoader(heroTitle, originalTitleText); // 150ms delay between words
	}

	// Start subtitle loading after title has started
	setTimeout(() => {
		if (heroSubtitle) {
			wordByWordLoader(heroSubtitle, originalSubtitleText, 50); // Slightly faster for subtitle
		}
	}, 1000); // Start subtitle 800ms after title
}

// Add modern mouse cursor effect
document.addEventListener("mousemove", e => {
	const cursor = document.querySelector(".custom-cursor");
	if (!cursor) {
		const cursorElement = document.createElement("div");
		cursorElement.className = "custom-cursor";
		cursorElement.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            pointer-events: none;
            mix-blend-mode: difference;
            z-index: 9999;
            transition: all 0.3s ease;
        `;
		document.body.appendChild(cursorElement);
	}

	const cursorEl = document.querySelector(".custom-cursor");
	cursorEl.style.left = e.clientX - 10 + "px";
	cursorEl.style.top = e.clientY - 10 + "px";
});

// Add smooth page transitions
function addPageTransitions() {
	const style = document.createElement("style");
	style.textContent = `
        .hero-title {
            transition: opacity 0.5s ease;
        }
        
        .about-content {
            position: relative;
            z-index: 2;
        }
        
        .tech-item:hover {
            transform: scale(1.05);
            background: rgba(255, 255, 255, 0.2);
        }
        
        .step-number {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .step-number:hover {
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
        }
        
        .portfolio-item:hover .portfolio-image {
            transform: scale(1.05);
        }
        
        .portfolio-image {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-form {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-form:hover {
            transform: translateY(-5px);
        }
        
        .nav-logo a {
            transition: all 0.3s ease;
        }
        
        .nav-logo a:hover {
            transform: scale(1.1);
            text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
    `;
	document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
	// Observe elements for animation
	const elementsToAnimate = document.querySelectorAll(
		".service-card, .portfolio-item, .process-step, .floating-card"
	);
	elementsToAnimate.forEach(el => {
		observer.observe(el);
	});

	// Trigger word-by-word loader
	startWordByWordLoader();

	// Add page transition
	addPageTransitions();
});

// Loading Screen Animation
window.addEventListener("load", () => {
	const loadingScreen = document.querySelector(".loading-screen");
	const body = document.body;
	const heroContainer = document.querySelector(".hero-container");
	heroContainer.style.display = "none";

	// Loading stars removed - they now only appear in hero section

	// Create hero stars (hidden initially)
	createHeroStars();

	setTimeout(() => {
		heroContainer.style.display = "flex";
	}, 1500);
});
