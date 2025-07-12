"use client";

import { useEffect, useRef } from "react";
import "./Process.css";

export default function Process() {
	const processRef = useRef<HTMLDivElement>(null);

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

		if (processRef.current) {
			const processSteps = processRef.current.querySelectorAll(".process-step");
			processSteps.forEach(step => observer.observe(step));
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section className='process' ref={processRef}>
			<div className='container'>
				<div className='section-header'>
					<h2>Naš proces</h2>
					<p>Kako radimo na vašem projektu</p>
				</div>
				<div className='process-steps'>
					<div className='process-step'>
						<div className='step-number'>1</div>
						<div className='step-content'>
							<h3>Analiza i planiranje</h3>
							<p>
								Analiziramo vaše potrebe i ciljeve, kreiramo detaljnu strategiju i
								plan implementacije.
							</p>
						</div>
					</div>
					<div className='process-step'>
						<div className='step-number'>2</div>
						<div className='step-content'>
							<h3>Dizajn i prototip</h3>
							<p>
								Kreiramo wireframe-ove i vizuelni dizajn koji odražava vaš brand i
								ciljeve.
							</p>
						</div>
					</div>
					<div className='process-step'>
						<div className='step-number'>3</div>
						<div className='step-content'>
							<h3>Development</h3>
							<p>
								Implementiramo funkcionalnosti koristeći najbolje prakse i najnovije
								tehnologije.
							</p>
						</div>
					</div>
					<div className='process-step'>
						<div className='step-number'>4</div>
						<div className='step-content'>
							<h3>Testiranje i lansiranje</h3>
							<p>
								Temeljno testiramo sve funkcionalnosti prije lansiranja i pružamo
								ongoing podršku.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
