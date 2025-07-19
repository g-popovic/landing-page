"use client";

import { useState } from "react";
import "./Contact.css";
import Image from "next/image";
import contactIcon1 from "../../public/icons/icon-1.svg";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const showNotification = (message: string, type: "success" | "error" = "success") => {
		// Remove existing notification
		const existingNotification = document.querySelector(".notification");
		if (existingNotification) {
			existingNotification.remove();
		}

		// Create notification element
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

		// Style notification
		const bgColor = type === "success" ? "#10b981" : "#ef4444";
		notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      max-width: 400px;
      animation: slideInFromRight 0.3s ease-out;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    `;

		// Add notification styles if not already present
		if (!document.getElementById("notification-styles")) {
			const style = document.createElement("style");
			style.id = "notification-styles";
			style.textContent = `
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .notification-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          opacity: 0.8;
        }
        .notification-close:hover {
          opacity: 1;
        }
      `;
			document.head.appendChild(style);
		}

		document.body.appendChild(notification);

		// Close button functionality
		const closeButton = notification.querySelector(".notification-close");
		if (closeButton) {
			closeButton.addEventListener("click", () => notification.remove());
		}

		// Auto-remove after 5 seconds
		setTimeout(() => {
			if (notification.parentNode) {
				notification.remove();
			}
		}, 5000);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			showNotification(
				"Vaša poruka je uspješno poslana! Odgovorićemo vam uskoro.",
				"success"
			);
			setFormData({ name: "", email: "", subject: "", message: "" });
		} catch {
			showNotification(
				"Dogodila se greška prilikom slanja poruke. Molimo pokušajte ponovo.",
				"error"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id='contact' className='contact'>
			<div className='container'>
				<div className='contact-content'>
					<div className='contact-info'>
						<h2>Kontaktirajte nas</h2>
						<p>
							Spremni smo da razgovaramo o vašem sledećem projektu. Pošaljite nam
							poruku ili pozovite direktno.
						</p>
						<div className='contact-details'>
							<div className='contact-item'>
								<Image
									src={contactIcon1}
									alt='Contact Icon'
									width={48}
									height={48}
								/>
								<div>
									<h4>Lokacija</h4>
									<p>Podgorica, Crna Gora</p>
								</div>
							</div>
							<div className='contact-item'>
								<Image
									src={contactIcon1}
									alt='Contact Icon'
									width={48}
									height={48}
								/>
								<div>
									<h4>Email</h4>
									<p>hello@quarkdigital.me</p>
								</div>
							</div>
							<div className='contact-item'>
								<Image
									src={contactIcon1}
									alt='Contact Icon'
									width={48}
									height={48}
								/>
								<div>
									<h4>Telefon</h4>
									<p>+382 69 123 456</p>
								</div>
							</div>
						</div>
					</div>
					<div className='contact-form'>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<input
									type='text'
									name='name'
									placeholder='Vaše ime'
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<input
									type='email'
									name='email'
									placeholder='Vaš email'
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									name='subject'
									placeholder='Tema poruke'
									value={formData.subject}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<textarea
									name='message'
									placeholder='Vaša poruka'
									rows={5}
									value={formData.message}
									onChange={handleChange}
									required
								/>
							</div>
							<button
								type='submit'
								className='btn btn-primary'
								disabled={isSubmitting}>
								{isSubmitting ? "Šalje se..." : "Pošalji poruku"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
