// Loading Screen Animation
window.addEventListener("load", () => {
	const loadingScreen = document.querySelector(".loading-screen");
	const body = document.body;

	// Hide loading screen after a minimum time
	setTimeout(() => {
		loadingScreen.classList.add("fade-out");
		body.classList.add("loaded");

		// Remove loading screen from DOM after animation
		setTimeout(() => {
			loadingScreen.remove();
		}, 1000);
	}, 2500); // Show for at least 2.5 seconds
});

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

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
	const elementsToAnimate = document.querySelectorAll(
		".service-card, .portfolio-item, .process-step, .floating-card"
	);
	elementsToAnimate.forEach(el => {
		observer.observe(el);
	});
});

// Add animation styles
const animationStyles = document.createElement("style");
animationStyles.textContent = `
    .service-card, .portfolio-item, .process-step {
        opacity: 0;
        transform: translateY(60px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-card.animate-in, .portfolio-item.animate-in, .process-step.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .floating-card {
        opacity: 0;
        transform: scale(0.8) translateY(40px);
        transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .floating-card.animate-in {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    
    /* Stagger animation delays */
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    .service-card:nth-child(4) { transition-delay: 0.4s; }
    .service-card:nth-child(5) { transition-delay: 0.5s; }
    .service-card:nth-child(6) { transition-delay: 0.6s; }
    
    .portfolio-item:nth-child(1) { transition-delay: 0.1s; }
    .portfolio-item:nth-child(2) { transition-delay: 0.2s; }
    .portfolio-item:nth-child(3) { transition-delay: 0.3s; }
    
    .process-step:nth-child(1) { transition-delay: 0.1s; }
    .process-step:nth-child(2) { transition-delay: 0.2s; }
    .process-step:nth-child(3) { transition-delay: 0.3s; }
    .process-step:nth-child(4) { transition-delay: 0.4s; }
`;

document.head.appendChild(animationStyles);

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

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
	element.innerHTML = "";
	let i = 0;

	function type() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i);
			i++;
			setTimeout(type, speed);
		}
	}

	type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
	// Delay the typing effect until after loading screen
	setTimeout(() => {
		const heroTitle = document.querySelector(".hero-title");
		if (heroTitle) {
			const originalText = heroTitle.textContent;
			heroTitle.style.opacity = "0";
			setTimeout(() => {
				heroTitle.style.opacity = "1";
				typeWriter(heroTitle, originalText, 25);
			}, 500);
		}
	}, 3000); // Start after loading screen
});

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

// Initialize modern effects
document.addEventListener("DOMContentLoaded", () => {
	addPageTransitions();
});

console.log("Quark Digital landing page loaded successfully! 🚀✨");
