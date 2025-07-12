"use client";

import Link from "next/link";
import "./Footer.css";

export default function Footer() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer-content'>
					<div className='footer-section'>
						<h3>Quark Digital</h3>
						<p>
							Web development agencija iz Crne Gore specijalizovana za moderne
							digitalne solucije.
						</p>
					</div>
					<div className='footer-section'>
						<h4>Usluge</h4>
						<ul>
							<li>
								<Link href='#services' onClick={() => scrollToSection("services")}>
									Web Development
								</Link>
							</li>
							<li>
								<Link href='#services' onClick={() => scrollToSection("services")}>
									E-commerce
								</Link>
							</li>
							<li>
								<Link href='#services' onClick={() => scrollToSection("services")}>
									Mobile Apps
								</Link>
							</li>
							<li>
								<Link href='#services' onClick={() => scrollToSection("services")}>
									UI/UX Design
								</Link>
							</li>
						</ul>
					</div>
					<div className='footer-section'>
						<h4>Kontakt</h4>
						<ul>
							<li>Podgorica, Crna Gora</li>
							<li>hello@quarkdigital.me</li>
							<li>+382 69 123 456</li>
						</ul>
					</div>
				</div>
				<div className='footer-bottom'>
					<p>&copy; 2024 Quark Digital. Sva prava zadržana.</p>
				</div>
			</div>
		</footer>
	);
}
