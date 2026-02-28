import React from "react";
import Carousel from "./Carousel";
import "./PersonalProjects.css";

const learningProjects = [
	{
		id: 4,
		title: "POSTR",
		date: "Jun 2022",
		description:
			"Tokom LateNightHacks hakatona razvili smo funkcionalan prototip društvene aplikacije koja uvodi novi model nagrađivanja korisnika kroz angažman. Od ideje do demo verzije stigli smo u vrlo kratkom roku."
	},
	{
		id: 5,
		title: "Carbon Tracker",
		date: "Maj 2022",
		description:
			"Na ToHacks hakatonu napravili smo jednostavan web alat za praćenje ličnog ugljeničnog otiska. Fokus je bio na jasnom prikazu podataka i praktičnim koracima koji korisnicima pomažu da smanje uticaj na okolinu."
	},
	{
		id: 6,
		title: "GymBuddy  🏆",
		date: "Mar. 2021",
		description:
			"Pobjednički projekat sa međunarodnog WinHacks hakatona: platforma koja spaja ljude sa partnerima za trening prema lokaciji i ciljevima. Iskustvo je potvrdilo sposobnost brze isporuke i kvalitetne realizacije pod pritiskom."
	},
	{
		id: 7,
		title: "Ecommerce Website",
		date: "Sep. 2020",
		description:
			"Jednostavna e-commerce platforma za online prodaju patika, sa plaćanjem karticama, administracijom proizvoda i osnovnom analitikom prodaje."
	},
	{
		id: 8,
		title: "Social Media Website",
		date: "Jul 2020",
		description:
			"Društvena mreža sa profilima, objavama, lajkovima i real-time dopisivanjem, kreirana kao kompletan end-to-end projekat."
	},
	{
		id: 9,
		title: "Blogging Website",
		date: "Jun 2020",
		description:
			"Blog platforma na kojoj korisnici mogu da otvore nalog, objavljuju tekstove i komuniciraju kroz komentare i reakcije."
	}
];

export default function PersonalProjects() {
	function renderLearningProjectItem(item: (typeof learningProjects)[0]) {
		return (
			<div
				className='portfolio-learning-card card highlighted-3'
				key={item.id}
				data-index={item.id}>
				<div className='portfolio-content'>
					<div>
						<div className='portfolio-content-header'>
							<h3>{item.title}</h3>
							<p className='date'>{item.date}</p>
						</div>

						<p>{item.description}</p>
					</div>
				</div>
			</div>
		);
	}

	const learningProjectItems = learningProjects.map(renderLearningProjectItem);

	return (
		<div>
			<div className='section-header animate-in container'>
				<h2>Licni Projekti</h2>
				<p>
					Iskustvo iz realnih proizvoda i platformi, sa fokusom na rezultate koji donose
					vrijednost klijentima.
				</p>
			</div>
			<div className='portfolio-carousel-block personal-projects'>
				<Carousel items={learningProjectItems} />
			</div>
		</div>
	);
}
