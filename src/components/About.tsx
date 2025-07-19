"use client";

import "./About.css";
import Image from "next/image";
import aboutImage from "../../public/about-2.jpg";

export default function About() {
	return (
		<section id='about' className='about'>
			<div className='container'>
				<h2>O nama</h2>

				<div className='about-content'>
					<div className='img-container'>
						<Image src={aboutImage} alt='About' fill={true} />
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					</p>
				</div>
			</div>
		</section>
	);
}
