"use client";

import "./Contact.css";

const contactInfo = [
	{
		title: "✉️ Email",
		description: "georgepopovich14@\ngmail.com"
	},
	{
		title: "📞 Telefon",
		description: "+382 69 397 895\n(Viber / WhatsApp)"
	},
	{
		title: "🌍 Lokacija",
		description: "Podgorica - Budva\n Crna Gora"
	}
];

export default function Contact() {
	function renderContactItem(item: (typeof contactInfo)[0]) {
		const splitDescription = item.description.split("\n");

		return (
			<div className='contact-item' key={item.title}>
				<div className='contact-item-header'>
					<h3>{item.title}</h3>
				</div>
				<p>
					{splitDescription.map((line, index) => (
						<span key={index}>
							{line}
							{index < splitDescription.length - 1 && <br />}
						</span>
					))}
				</p>
			</div>
		);
	}

	return (
		<section id='contact' className='contact container'>
			<div className='contact-content'>
				<div className='contact-info'>
					<div className='animate-in idk'>
						<h2>Kontakt</h2>
						<p>
							Imate pitanja? Spreman sam da pomognem Vama i Vasem projektu na najbolji
							mogući način. Pošaljite mi poruku ili pozovite direktno.
						</p>
					</div>
					<div className='contact-gradient-container animate-in'>
						<div className='cta-gradient' />
					</div>
					<div className='animate-in'>
						<div className='contact-list card highlighted '>
							{contactInfo.map(renderContactItem)}
						</div>

						<div className='contact-cta-container '>
							<div className='contact-cta-background-gradient' />
							<a className='btn contact-cta' href='tel:+38269397895'>
								Kontaktiraj
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
