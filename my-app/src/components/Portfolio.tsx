"use client";

import { useEffect, useRef } from "react";
import "./Portfolio.css";

export default function Portfolio() {
	const portfolioRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
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

		if (portfolioRef.current) {
			const portfolioItems = portfolioRef.current.querySelectorAll(".portfolio-item");
			portfolioItems.forEach(item => observer.observe(item));
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section id='portfolio' className='portfolio' ref={portfolioRef}>
			<div className='container'>
				<div className='section-header'>
					<h2>Naš rad</h2>
					<p>Pogledajte neke od projekata koje smo realizovali</p>
				</div>
				<div className='portfolio-grid'>
					<div className='portfolio-item'>
						<div className='portfolio-image'>
							<div className='portfolio-placeholder'>
								<div className='placeholder-icon'>🏢</div>
							</div>
						</div>
						<div className='portfolio-content'>
							<h3>Corporate Website</h3>
							<p>
								Moderna korporativna web stranica sa CMS sistemom i multi-language
								podrškom.
							</p>
							<div className='portfolio-tags'>
								<span className='tag'>React</span>
								<span className='tag'>Next.js</span>
								<span className='tag'>Strapi</span>
							</div>
						</div>
					</div>
					<div className='portfolio-item'>
						<div className='portfolio-image'>
							<div className='portfolio-placeholder'>
								<div className='placeholder-icon'>🛍️</div>
							</div>
						</div>
						<div className='portfolio-content'>
							<h3>E-commerce Platform</h3>
							<p>
								Kompletna e-commerce platforma sa inventory management i payment
								processing.
							</p>
							<div className='portfolio-tags'>
								<span className='tag'>Vue.js</span>
								<span className='tag'>Laravel</span>
								<span className='tag'>Stripe</span>
							</div>
						</div>
					</div>
					<div className='portfolio-item'>
						<div className='portfolio-image'>
							<div className='portfolio-placeholder'>
								<div className='placeholder-icon'>📱</div>
							</div>
						</div>
						<div className='portfolio-content'>
							<h3>Mobile App</h3>
							<p>
								Cross-platform mobilna aplikacija za food delivery sa real-time
								tracking.
							</p>
							<div className='portfolio-tags'>
								<span className='tag'>React Native</span>
								<span className='tag'>Firebase</span>
								<span className='tag'>Maps API</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
