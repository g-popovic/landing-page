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
	function renderServiceCard(service: (typeof services)[0]) {
		return (
			<div className='service-timeline-item animate-in' key={service.id}>
				<article className='card highlighted service-card'>
					<div className='service-header'>
						<h3 className='service-name'>{service.title}</h3>
						<h3 className='service-number'>{service.id}</h3>
					</div>
					<p className='service-description'>{service.description}</p>
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
		<section id='services' className='services'>
			<div className='container'>
				<div className='section-header animate-in'>
					<h2>Usluge</h2>
					<p>
						Od ideje do lansiranja, vodimo vas kroz jasan proces koji je fokusiran na
						rezultate i nove klijente.
					</p>
				</div>
				<div className='services-timeline'>{services.map(renderServiceCard)}</div>
			</div>
		</section>
	);
}
