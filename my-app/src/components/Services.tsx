"use client";

import { useEffect, useRef } from "react";
import "./Services.css";

export default function Services() {
	const servicesRef = useRef<HTMLDivElement>(null);

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

		if (servicesRef.current) {
			const serviceCards = servicesRef.current.querySelectorAll(".service-card");
			serviceCards.forEach(card => observer.observe(card));
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section id='services' className='services' ref={servicesRef}>
			<div className='container'>
				<div className='section-header'>
					<h2>Naše usluge</h2>
					<p>Pružamo kompletna digitalna rešenja prilagođena vašim potrebama</p>
				</div>
				<div className='services-grid'>
					<div className='service-card'>
						<div className='service-icon'>🌐</div>
						<h3>Web Development</h3>
						<p>
							Moderne web aplikacije izgrađene sa najnovijim tehnologijama. React,
							Next.js, Node.js i više.
						</p>
						<ul className='service-features'>
							<li>Custom web aplikacije</li>
							<li>Progressive Web Apps</li>
							<li>API Development</li>
						</ul>
					</div>
					<div className='service-card'>
						<div className='service-icon'>🛒</div>
						<h3>E-commerce</h3>
						<p>
							Kompletna e-commerce rešenja koja povećavaju prodaju i poboljšavaju
							korisničko iskustvo.
						</p>
						<ul className='service-features'>
							<li>Online prodavnice</li>
							<li>Payment integration</li>
							<li>Inventory management</li>
						</ul>
					</div>
					<div className='service-card'>
						<div className='service-icon'>📱</div>
						<h3>Mobile Apps</h3>
						<p>
							Cross-platform mobilne aplikacije koje rade savršeno na iOS i Android
							uređajima.
						</p>
						<ul className='service-features'>
							<li>React Native</li>
							<li>Flutter development</li>
							<li>App Store deployment</li>
						</ul>
					</div>
					<div className='service-card'>
						<div className='service-icon'>🎨</div>
						<h3>UI/UX Design</h3>
						<p>
							Kreativni dizajn koji kombinuje estetiku sa funkcionalnosti za optimalno
							korisničko iskustvo.
						</p>
						<ul className='service-features'>
							<li>User research</li>
							<li>Wireframing & prototyping</li>
							<li>Visual design</li>
						</ul>
					</div>
					<div className='service-card'>
						<div className='service-icon'>🔧</div>
						<h3>Maintenance & Support</h3>
						<p>
							Kontinuirana podrška i održavanje za sigurnost i optimalnu performanse
							vašeg sajta.
						</p>
						<ul className='service-features'>
							<li>Regular updates</li>
							<li>Security monitoring</li>
							<li>Performance optimization</li>
						</ul>
					</div>
					<div className='service-card'>
						<div className='service-icon'>📊</div>
						<h3>Digital Marketing</h3>
						<p>
							SEO optimizacija i digitalni marketing strategije za povećanje online
							prisustva.
						</p>
						<ul className='service-features'>
							<li>SEO optimization</li>
							<li>Analytics setup</li>
							<li>Performance tracking</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
