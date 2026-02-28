"use client";

import "./Footer.css";

const currentYear = new Date().getFullYear();

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer-content'>
					<div className='footer-section'>
						<h3>Đorđe Popović</h3>
						<p>Softverski inženjer. Izrada i dizajn web sajtova.</p>
					</div>
					<div className='footer-section'>
						<h4>Usluge</h4>
						<ul>
							<li>Web Design</li>
							<li>Web Development</li>
							<li>Hosting</li>
						</ul>
					</div>
					<div className='footer-section'>
						<h4>Kontakt</h4>
						<ul>
							<li>Podgorica, Crna Gora</li>
							<li>georgepopovich14@gmail.com</li>
							<li>+382 69 397 895</li>
						</ul>
					</div>
				</div>
				<div className='footer-bottom'>
					<p>&copy; {currentYear} Đorđe Popović.</p>
				</div>
			</div>
		</footer>
	);
}
