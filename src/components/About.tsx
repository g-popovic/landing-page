"use client";

import "./About.css";
import Image from "next/image";
import aboutImage from "../../public/avatar.jpg";

export default function About() {
	return (
		<section id='about' className='about'>
			<div className='container'>
				<h2>O meni</h2>

				<div className='about-content card highlighted'>
					<div className='img-container'>
						<Image src={aboutImage} alt='Đorđe Popović' fill={true} />
					</div>
					<p>
						Ja sam Đorđe Popović, full-stack developer sa više od 5 godine iskustva u
						izradi web i mobilnih proizvoda. Pomažem malim biznisima i preduzetnicima da
						dobiju brz, moderan i jasan sajt koji ostavlja profesionalan utisak i
						podstiče potencijalne klijente da se jave. Pristup mi je jednostavan: jasan
						dizajn, kvalitetna izrada i fokus na rezultatima koji su važni za vaš posao.
					</p>
				</div>
			</div>
		</section>
	);
}
