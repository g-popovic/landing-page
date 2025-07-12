"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./Navigation.css";

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const handleScroll = () => {
			const sections = ["home", "services", "about", "portfolio", "contact"];
			const scrollPosition = window.scrollY + 200;

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
			element.scrollIntoView({ behavior: "smooth" });
		}
		closeMenu();
	};

	return (
		<nav className='nav'>
			<div className='nav-container'>
				<div className='nav-logo'>
					<Link href='#home' onClick={() => scrollToSection("home")}>
						Quark Digital
					</Link>
				</div>
				<ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
					<li className='nav-item'>
						<Link
							href='#home'
							className={`nav-link ${activeSection === "home" ? "active" : ""}`}
							onClick={() => scrollToSection("home")}>
							Početna
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							href='#services'
							className={`nav-link ${activeSection === "services" ? "active" : ""}`}
							onClick={() => scrollToSection("services")}>
							Usluge
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							href='#about'
							className={`nav-link ${activeSection === "about" ? "active" : ""}`}
							onClick={() => scrollToSection("about")}>
							O nama
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							href='#portfolio'
							className={`nav-link ${activeSection === "portfolio" ? "active" : ""}`}
							onClick={() => scrollToSection("portfolio")}>
							Portfolio
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							href='#contact'
							className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
							onClick={() => scrollToSection("contact")}>
							Kontakt
						</Link>
					</li>
				</ul>
				<div className='nav-toggle' onClick={toggleMenu}>
					<span className='bar'></span>
					<span className='bar'></span>
					<span className='bar'></span>
				</div>
			</div>
		</nav>
	);
}
