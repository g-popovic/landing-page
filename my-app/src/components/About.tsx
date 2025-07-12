"use client";

import "./About.css";

export default function About() {
	return (
		<section id='about' className='about'>
			<div className='container'>
				<div className='about-content'>
					<div className='about-text'>
						<h2>O nama</h2>
						<p className='about-intro'>
							Mi smo tim strastvenih developera i designera iz Crne Gore koji
							vjerujemo da kvalitetan kod i kreativni dizajn mogu transformisati vaš
							biznis.
						</p>
						<p>
							Sa više od 5 godina iskustva u web developmentu, radili smo sa
							klijentima iz različitih industrija - od startupova do velikih
							korporacija. Naš pristup je jednostavan: razumjemo vaše potrebe,
							kreiramo rešenja koja funkcionišu, i pružamo podršku kada je potrebna.
						</p>
						<div className='about-stats'>
							<div className='stat'>
								<h3>50+</h3>
								<p>Uspješnih projekata</p>
							</div>
							<div className='stat'>
								<h3>5+</h3>
								<p>Godina iskustva</p>
							</div>
							<div className='stat'>
								<h3>100%</h3>
								<p>Zadovoljnih klijenata</p>
							</div>
						</div>
					</div>
					<div className='about-image'>
						<div className='about-graphic'>
							<div className='tech-stack'>
								<div className='tech-item'>React</div>
								<div className='tech-item'>Next.js</div>
								<div className='tech-item'>Node.js</div>
								<div className='tech-item'>TypeScript</div>
								<div className='tech-item'>MongoDB</div>
								<div className='tech-item'>PostgreSQL</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
