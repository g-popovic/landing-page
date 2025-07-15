"use client";

import { useEffect, useRef } from "react";
import "./Services.css";
import icon1 from "../../public/icons/icon-1.svg";
import Image from "next/image";

const services = [
	{
		id: 1,
		icon: icon1,
		title: "Dizajn Sajta: UI/UX",
		description:
			"Stvaramo dizajn za vas sajt koji izgleda moderno, pristupacno, funkcionalno - sa glavnim ciljem da privuce korisnike i da im omoguci da se lako upoznaju sa Vasom biznisom."
	},
	{
		id: 2,
		icon: icon1,
		title: "Izrada Web Sajta",
		description:
			"Koristeci najnovije tehnologije, nas tim strucjaka ce razviti web sajt za Vas biznis koji ce biti brz, siguran i funkcionalan. Koristimo iste tehnologije koje pokrecu neke od najvecih sajtova na svetu."
	},
	{
		id: 4,
		icon: icon1,
		title: "Lansiranje i Održavanje",
		description:
			"Vas sajt ce biti hostovan na najsigurnijim serverima, kao i održavan i ažuriran u skladu sa najnovijim tehnologijama. Zahvaljujuci nasoj SEO optimizaciji, maksimalizujemo sanse da se vas sajt prikaze na svim pretrazivacima."
	}
];

export default function Services() {
	const servicesRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);

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
			serviceCards.forEach(card => observer.observe(card));
		}

		if (headerRef.current) {
			observer.observe(headerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	function renderServiceCard(service: (typeof services)[0]) {
		return (
			<div className='card service-card' key={service.id} data-index={service.id}>
				<Image className='service-icon' src={service.icon} alt={service.title} />
				<h3>{service.title}</h3>
				<p>{service.description}</p>
			</div>
		);
	}

	return (
		<section id='services' className='services' ref={servicesRef}>
			<div className='container'>
				<div className='section-header' ref={headerRef}>
					<h2>Naše usluge</h2>
					<p>Pružamo kompletna digitalna rešenja prilagođena vašim potrebama</p>
				</div>
				<div className='services-grid'>{services.map(renderServiceCard)}</div>
			</div>
		</section>
	);
}
