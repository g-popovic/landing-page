"use client";

import "./About.css";
import Image from "next/image";
import aboutImage from "../../public/avatar.jpg";

export default function About() {
	return (
		<section id='about' className='about container'>
			<div className='about-content'>
				<div className='about-text '>
					<div className='img-container'>
						<Image src={aboutImage} alt='Đorđe Popović' fill={true} />
					</div>
				</div>

				<div>
					<h2>Biografija</h2>

					<p>
						Ja sam Đorđe Popović, softverski inženjer sa više od 5 godine iskustva u
						profesionalnoj izradi web i mobilnih proizvoda, stečenog u svjetskim IT
						firmama. Počeo sam da programiram sa 12 godina, a sada pomažem malim
						biznisima i preduzetnicima da dobiju kvalitetan, brz, i moderan sajt koji
						ostavlja profesionalan utisak i podstiče pronalaženje novih klijenata.
						Pristup mi je jednostavan: jasan dizajn, kvalitetna izrada i fokus na
						rezultate koji su Vama važni.
					</p>
				</div>
			</div>
		</section>
	);
}
