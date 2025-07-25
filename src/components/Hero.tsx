"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Hero.css";

export default function Hero() {
	const heroStarsRef = useRef<HTMLDivElement>(null);
	const heroContainerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	const title = "Agencija Najjaca";
	const subtitle =
		"Profesionalna web development agencija iz Crne Gore specijalizovana za moderne web aplikacije, e-commerce platforme i digitalne transformacije.";

	function createHeroStars() {
		const heroStarsContainer = heroStarsRef.current;
		if (!heroStarsContainer) return;

		const starCount = 200;
		const movementSpeed = 0.5;

		// Render initial stars that will be everywhere on-screen and disappear when they reach the center
		for (let i = 0; i < starCount * 0.5; i++) {
			const star = document.createElement("div");
			star.className = "hero-star";

			const x = Math.random() * 100;
			const y = Math.random() * 100;
			const deltaX = 50 - x;
			const deltaY = 50 - y;

			const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			const animationDuration = distanceFromCenter * movementSpeed;

			// Set initial position
			star.style.left = x + "%";
			star.style.top = y + "%";
			star.style.animationDuration = `${animationDuration}s`;
			star.style.animationIterationCount = "1";

			heroStarsContainer.appendChild(star);
		}

		// Render stars that start from beyond the screen and cycle continuously
		for (let i = 0; i < starCount; i++) {
			const star = document.createElement("div");
			star.className = "hero-star";

			// Random starting position around the edges
			const side = Math.floor(Math.random() * 4);
			let x = 0,
				y = 0;

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

			const animationDuration = 60 * movementSpeed;

			// Set initial position
			star.style.left = x + "%";
			star.style.top = y + "%";
			star.style.animationDelay = Math.random() * animationDuration + "s";
			star.style.animationDuration = `${animationDuration}s`;
			star.style.opacity = (Math.random() * 0.6 + 0.3).toString();

			heroStarsContainer.appendChild(star);
		}
	}

	useEffect(() => {
		// Setup word-by-word loading
		const setupWordLoading = (element: HTMLElement, text: string) => {
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

			return overlay;
		};

		const wordByWordLoader = (
			element: HTMLElement,
			text: string,
			wordDelay: number = 100,
			separator = " "
		) => {
			const words = text.split(separator);
			const overlay = element.querySelector(".word-overlay") as HTMLElement;
			if (!overlay) return;

			overlay.innerHTML = "";

			words.forEach((word, index) => {
				const wordSpan = document.createElement("span");
				wordSpan.className = "word";
				wordSpan.innerHTML = word.replace(" ", "&nbsp;"); // handle empty spaces
				wordSpan.style.animationDelay = `${index * wordDelay}ms`;
				overlay.appendChild(wordSpan);

				// Add space after each word except the last one
				if (index < words.length - 1) {
					overlay.appendChild(document.createTextNode(separator));
				}
			});
		};

		// Initialize loading screen
		const initLoadingScreen = () => {
			const heroContainer = heroContainerRef.current;
			if (!heroContainer) return;

			setTimeout(() => {
				heroContainer.style.display = "block";

				// Start word-by-word loading
				if (titleRef.current) {
					setupWordLoading(titleRef.current, title);
					wordByWordLoader(titleRef.current, title, 30, "");
				}

				if (subtitleRef.current) {
					setupWordLoading(subtitleRef.current, subtitle);
					setTimeout(() => {
						wordByWordLoader(subtitleRef.current!, subtitle, 80);
					}, 800);
				}
			}, 1500);
		};

		createHeroStars();
		initLoadingScreen();
	}, []);

	return (
		<section id='home' className='hero'>
			{/* Hero Stars Background */}
			<div className='hero-stars' ref={heroStarsRef}></div>

			{/* Hero Background Rings */}
			<div className='hero-rings'>
				<Image
					src='/hero-ring.png'
					alt=''
					className='hero-ring-2'
					width={310}
					height={310}
				/>
				<Image
					src='/hero-ring.png'
					alt=''
					className='hero-ring-1'
					width={400}
					height={400}
				/>
			</div>

			<div className='hero-container' ref={heroContainerRef}>
				<div className='hero-content'>
					<h1 className='hero-title' ref={titleRef}>
						{title}
					</h1>
					<p className='hero-subtitle' ref={subtitleRef}>
						{subtitle}
					</p>
					<div className='hero-buttons'>
						<Link href='#contact' className='btn btn-primary'>
							Započni projekt
						</Link>
						<Link href='#services' className='btn btn-secondary'>
							Naše usluge
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
