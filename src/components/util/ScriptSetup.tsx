"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

export default function ScriptSetup() {
	// NOTE: Currently this just has Lenis for smooth scrolling but we may add more scripts / utils here as time goes on
	useEffect(() => {
		const observerOptions = {
			threshold: 0.2,
			rootMargin: "0px 0px -60px 0px"
		};

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add("show");
				}
			});
		}, observerOptions);

		const animateAppearence = document.querySelectorAll(".animate-in");
		console.log({ animateAppearence });
		animateAppearence.forEach(item => observer.observe(item));

		return () => observer.disconnect();
	}, []);
	return (
		<>
			<ReactLenis root />
		</>
	);
}
