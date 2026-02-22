"use client";

import "./Contact.css";
import Image from "next/image";
import icon from "../../public/icons/icon-phone.svg";

export default function Contact() {
	return (
		<section id='contact' className='contact container'>
			<div className='contact-content'>
				<div className='contact-info'>
					<h2>Kontakt</h2>
					<p>
						Imate pitanja? Spreman sam da pomognem Vama i Vasem projektu na najbolji
						mogući način. Pošaljite mi poruku ili pozovite direktno.
					</p>
					<div className='contact-list'>
						<div className='contact-item'>
							<Image src={icon} alt='Contact Icon' width={48} height={48} />
							<div>
								<h4>Lokacija</h4>
								<p>Podgorica - Budva, Crna Gora</p>
							</div>
						</div>
						<div className='contact-item'>
							<Image src={icon} alt='Contact Icon' width={48} height={48} />
							<div>
								<h4>Email</h4>
								<p>hello@quarkdigital.me</p>
							</div>
						</div>
						<div className='contact-item'>
							<Image src={icon} alt='Contact Icon' width={48} height={48} />
							<div>
								<h4>Telefon</h4>
								<p>+382 69 123 456</p>
							</div>
						</div>
					</div>

					<a className='btn btn-primary' href='tel:+38269397895'>
						Kontaktiraj
					</a>
				</div>
			</div>
		</section>
	);
}
