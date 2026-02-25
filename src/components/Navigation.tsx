"use client";

import { useState, useEffect } from "react";
import "./Navigation.css";

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const handleScroll = () => {
			const sections = ["home", "services", "about", "portfolio", "contact"];
			const scrollPosition = window.scrollY + window.innerHeight / 4;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetBottom = offsetTop + element.offsetHeight;

					if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const offsetTop = element.offsetTop;
			window.scrollTo({
				top: offsetTop,
				behavior: "smooth"
			});
		}
		closeMenu();
	};

	return (
		<nav className='nav'>
			<div className='nav-container'>
				<div className='nav-logo'>
					<a onClick={() => scrollToSection("home")}>Đorđe Popović</a>
				</div>
				<ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
					<li className='nav-item'>
						<a
							className={`nav-link ${activeSection === "home" ? "active" : ""}`}
							onClick={() => scrollToSection("home")}>
							Početna
						</a>
					</li>

					<li className='nav-item'>
						<a
							className={`nav-link ${activeSection === "services" ? "active" : ""}`}
							onClick={() => scrollToSection("services")}>
							Usluge
						</a>
					</li>
					<li className='nav-item'>
						<a
							className={`nav-link ${activeSection === "portfolio" ? "active" : ""}`}
							onClick={() => scrollToSection("portfolio")}>
							Portfolio
						</a>
					</li>
					<li className='nav-item'>
						<a
							className={`nav-link ${activeSection === "about" ? "active" : ""}`}
							onClick={() => scrollToSection("about")}>
							O meni
						</a>
					</li>
					<li className='nav-item'>
						<a
							className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
							onClick={() => scrollToSection("contact")}>
							Kontakt
						</a>
					</li>
				</ul>
				<div className={`nav-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
					<span className='bar'></span>
					<span className='bar'></span>
					<span className='bar'></span>
				</div>
			</div>
		</nav>
	);
}
