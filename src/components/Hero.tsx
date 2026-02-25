"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import "./Hero.css";
import StarsBackground from "./StarsBackground";

const HERO_RING_1_WIDTH = 500;

export default function Hero() {
	const heroStarsRef = useRef<HTMLDivElement>(null);
	const heroContainerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitle1Ref = useRef<HTMLParagraphElement>(null);
	const subtitle2Ref = useRef<HTMLParagraphElement>(null);

	const title = "Đorđe Popović";
	const subtitle1 = "Softverski Inženjer sa preko 5+ godina radnog iskustva.";
	const subtitle2 = "Specijalizovan u izradi modernih web sajtova i aplikacija.";

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
					wordByWordLoader(titleRef.current, title, 200);
				}

				if (subtitle1Ref.current) {
					setupWordLoading(subtitle1Ref.current, subtitle1);
					setTimeout(() => {
						wordByWordLoader(subtitle1Ref.current!, subtitle1, 50);
					}, 500);
				}

				if (subtitle2Ref.current) {
					setupWordLoading(subtitle2Ref.current, subtitle2);
					setTimeout(() => {
						wordByWordLoader(subtitle2Ref.current!, subtitle2, 50);
					}, 700);
				}
			}, 1500);
		};

		initLoadingScreen();
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const offsetTop = element.offsetTop;
			window.scrollTo({
				top: offsetTop,
				behavior: "smooth"
			});
		}
	};

	return (
		<section id='home' className='hero'>
			{/* Hero Stars Background */}
			<div className='hero-stars' ref={heroStarsRef}>
				<StarsBackground />
			</div>

			{/* Hero Background Rings */}
			<div className='hero-rings'>
				<Image
					src='/hero-ring.png'
					alt=''
					className='hero-ring-1'
					width={HERO_RING_1_WIDTH}
					height={HERO_RING_1_WIDTH}
				/>
			</div>

			<div className='hero-container' ref={heroContainerRef}>
				<div className='hero-content'>
					<h1 className='hero-title' ref={titleRef}>
						{title}
					</h1>
					<div>
						<p ref={subtitle1Ref} className='hero-subtitle'>
							{subtitle1}
						</p>
						<p ref={subtitle2Ref} className='hero-subtitle hide-mobile'>
							{subtitle2}
						</p>
					</div>
					<div className='hero-buttons'>
						<a
							onClick={() => scrollToSection("contact")}
							className='btn btn-primary hide-mobile'>
							Kontakt
						</a>
						<a
							onClick={() => scrollToSection("services")}
							className='btn btn-secondary'>
							Saznaj Više
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
