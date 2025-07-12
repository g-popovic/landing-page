"use client";

import { useEffect, useRef } from "react";
import "./Services.css";

const services = [
	{
		id: 1,
		icon: "🌐",
		title: "Web Development",
		description:
			"Moderne web aplikacije izgrađene sa najnovijim tehnologijama. React, Next.js, Node.js i više.",
		features: ["Custom web aplikacije", "Progressive Web Apps", "API Development"]
	},
	{
		id: 2,
		icon: "🛒",
		title: "E-commerce",
		description:
			"Kompletna e-commerce rešenja koja povećavaju prodaju i poboljšavaju korisničko iskustvo.",
		features: ["Online prodavnice", "Payment integration", "Inventory management"]
	},
	{
		id: 3,
		icon: "📱",
		title: "Mobile Apps",
		description:
			"Cross-platform mobilne aplikacije koje rade savršeno na iOS i Android uređajima.",
		features: ["React Native", "Flutter development", "App Store deployment"]
	},
	{
		id: 4,
		icon: "🎨",
		title: "UI/UX Design",
		description:
			"Kreativni dizajn koji kombinuje estetiku sa funkcionalnosti za optimalno korisničko iskustvo.",
		features: ["User research", "Wireframing & prototyping", "Visual design"]
	},
	{
		id: 5,
		icon: "🔧",
		title: "Maintenance & Support",
		description:
			"Kontinuirana podrška i održavanje za sigurnost i optimalnu performanse vašeg sajta.",
		features: ["Regular updates", "Security monitoring", "Performance optimization"]
	},
	{
		id: 6,
		icon: "📊",
		title: "Digital Marketing",
		description:
			"SEO optimizacija i digitalni marketing strategije za povećanje online prisustva.",
		features: ["SEO optimization", "Analytics setup", "Performance tracking"]
	}
];

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
					const index = parseInt(entry.target.getAttribute("data-index") || "0");
					setTimeout(() => {
						entry.target.classList.add("animate-in");
					}, index * 100);
				}
			});
		}, observerOptions);

		if (servicesRef.current) {
			const serviceCards = servicesRef.current.querySelectorAll(".service-card");
			serviceCards.forEach((card, i) => observer.observe(card));
		}

		return () => observer.disconnect();
	}, []);

	function renderServiceCard(service: (typeof services)[0]) {
		return (
			<div className='service-card' key={service.id} data-index={service.id}>
				<div className='service-icon'>{service.icon}</div>
				<h3>{service.title}</h3>
				<p>{service.description}</p>
				<ul className='service-features'>
					{service.features.map((feature, index) => (
						<li key={index}>{feature}</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<section id='services' className='services' ref={servicesRef}>
			<div className='container'>
				<div className='section-header'>
					<h2>Naše usluge</h2>
					<p>Pružamo kompletna digitalna rešenja prilagođena vašim potrebama</p>
				</div>
				<div className='services-grid'>{services.map(renderServiceCard)}</div>
			</div>
		</section>
	);
}
