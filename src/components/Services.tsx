"use client";

import { useEffect, useRef } from "react";
import "./Services.css";

const services = [
	{
		id: 1,
		title: "Dizajn",
		description:
			"Kreiramo izgled i strukturu sajta koja odmah gradi poverenje i jasno komunicira vrednost vaše ponude.",
		features: [
			"Jasna poruka i pozicioniranje ponude",
			"UI/UX koji vodi korisnika do kontakta",
			"Vizuelni stil usklađen sa vašim brendom"
		]
	},
	{
		id: 2,
		title: "Izrada",
		description:
			"Pretvaramo dizajn u brz, stabilan i moderan sajt koji izgleda odlično na svim uređajima.",
		features: [
			"Responsivan prikaz na telefonu, tabletu i desktopu",
			"Moderna tehnologija i čist kod",
			"Fokus na performanse, sigurnost i stabilnost"
		]
	},
	{
		id: 3,
		title: "Optimizacija",
		description:
			"Podešavamo SEO i tehničke detalje kako bi vaš sajt imao bolje šanse da rangira visoko na Google pretrazi.",
		features: [
			"On-page SEO: naslovi, meta opisi i struktura",
			"Tehnička optimizacija za bolji ranking",
			"Poboljšanje brzine i korisničkog iskustva"
		]
	},
	{
		id: 4,
		title: "Lansiranje i hosting",
		description:
			"Objavljujemo sajt na pouzdan hosting i ostajemo uz vas kroz održavanje i podršku nakon lansiranja.",
		features: [
			"Bezbedno lansiranje bez zastoja",
			"Monitoring, backup i redovna ažuriranja",
			"Brza podrška kad god vam je potrebna"
		]
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

	function renderServiceCard(service: (typeof services)[0], index: number) {
		return (
			<div className='service-timeline-item' key={service.id}>
				<article className='card service-card' data-index={index}>
					<h3>{service.title}</h3>
					<p>{service.description}</p>
					<ul className='service-features'>
						{service.features.map(feature => (
							<li key={feature}>{feature}</li>
						))}
					</ul>
				</article>
			</div>
		);
	}

	return (
		<section id='services' className='services' ref={servicesRef}>
			<div className='container'>
				<div className='section-header' ref={headerRef}>
					<h2>Proces izrade u 4 koraka</h2>
					<p>
						Od ideje do lansiranja, vodimo vas kroz jasan proces koji je fokusiran
						na rezultate i nove klijente.
					</p>
				</div>
				<div className='services-timeline'>{services.map(renderServiceCard)}</div>
			</div>
		</section>
	);
}
