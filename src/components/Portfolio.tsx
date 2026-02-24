import "./Portfolio.css";
import Image, { StaticImageData } from "next/image";
import reliveImage from "../../public/portfolio/relive.jpg";
import cameaImage from "../../public/portfolio/camea.jpg";
import etherImage from "../../public/portfolio/ether.jpg";
import cabloImage from "../../public/portfolio/cablo.jpg";
import mneLuxImage from "../../public/portfolio/mne-lux.jpg";
import bionizeImage from "../../public/portfolio/bionize.jpg";
import PersonalProjects from "./PersonalProjects";
import linkIcon from "../../public/icons/link-3.svg";

const currentYear = new Date().getFullYear();

type ProjectItem = {
	id: number;
	title: string;
	date: string;
	description: string;
	image: StaticImageData;
	link?: string;
};

const workExperience: ProjectItem[] = [
	{
		id: 1,
		title: "Relive",
		date: "2021 - 2026",
		description:
			"Relive je globalna platforma za praćenje aktivnosti poput trčanja, biciklizma i planinarenja, sa mobilnom aplikacijom i web iskustvom, koju koriste preko 20 miliona korisnika. Radio sam na ključnim dijelovima proizvoda koji utiču na svakodnevno iskustvo korisnika, uz redovne isporuke i mjerljivo smanjenje operativnih troškova za oko 3000 EUR mjesečno.",
		image: reliveImage,
		link: "https://relive.com"
	},
	{
		id: 2,
		title: "Camea",
		date: "Jan - Jun 2021 ",
		description:
			"Camea je platforma koja modernizuje caregiving usluge i olakšava povezivanje korisnika sa pružaocima njege. Vodio sam razvoj glavnih funkcionalnosti kako bi proizvod brže došao do korisnika i imao stabilnu osnovu za rast.",
		image: cameaImage
	},
	{
		id: 3,
		title: "Ether",
		date: "Nov - Dec 2020",
		description:
			"Ether je location-based društvena aplikacija koja povezuje ljude kroz lokalni sadržaj i interakciju. Preuzeo sam razvoj ključnih dijelova platforme i pomogao timu da MVP bude spreman znatno prije plana, što je omogućilo ranije testiranje ideje na tržištu.",
		image: etherImage
	}
];

const sideProjects: ProjectItem[] = [
	{
		id: 4,
		title: "Cablo",
		date: `2024 - ${currentYear}`,
		description:
			"Cablo je platforma za digitalizaciju licnog prevoza i taxi servisa u Crnoj Gori, nalik Uber-a. Dozvoljava korisnicima da zakažu vožnju putem aplikacije u bilo koje vrijeme širom teritorije Crne Gore. Zajedno sa dvoje programera, razvili smo čitav sistem (aplikaciju, sajt, i server) od nule.",
		image: cabloImage
	},
	{
		id: 5,
		title: "Montenegro Luxury Association",
		date: "2022 - 2023",
		description:
			"Za Montenegro Luxury Association razvio sam digitalnu platformu koja bolje predstavlja premium turističku ponudu i olakšava online prisustvo organizacije. Projekat je postavljen od nule, od koncepta do ključnih funkcionalnosti, sa fokusom na stabilan rast.",
		image: mneLuxImage
	},
	{
		id: 6,
		title: "Bionize",
		date: "Jun - Oct 2022",
		description:
			"Bionize je browser dodatak koji automatski prilagođava tekst na web stranicama kako bi sadržaj bio lakši i brži za čitanje. Proizvod je prešao 3000+ preuzimanja i pokazao koliko dobro osmišljen UX detalj može odmah povećati upotrebljivost.",
		image: bionizeImage
	}
];

export default function Portfolio() {
	function renderPortfolioItem(item: ProjectItem) {
		return (
			<a
				href={item.link}
				target='_blank'
				className='animate-in'
				key={item.id}
				data-index={item.id}>
				<div className='portfolio-item card'>
					<div className='portfolio-content'>
						<div>
							<div className='portfolio-content-header'>
								<h3>{item.title}</h3>
								<p>{item.date}</p>
							</div>

							<p>{item.description}</p>
						</div>

						{item.link && (
							<div className='portfolio-item-link'>
								<Image src={linkIcon} alt='Sajt' width={20} height={20} />
								<p className='link-text'>Posjeti Sajt</p>
							</div>
						)}
					</div>
					<div className='portfolio-image'>
						<Image src={item.image} alt={item.title} width={800} height={800} />
					</div>
				</div>
			</a>
		);
	}

	return (
		<section id='portfolio' className='portfolio '>
			<div className='portfolio-main-sections container'>
				<div className='section-header animate-in'>
					<h2>Radno Iskustvo</h2>
					<p>
						Iskustvo iz realnih proizvoda i platformi, sa fokusom na rezultate koji
						donose vrijednost klijentima.
					</p>
				</div>
				<div className='portfolio-items'>{workExperience.map(renderPortfolioItem)}</div>

				<div className='section-header animate-in'>
					<h2>Projekti i Saradnje</h2>
					<p>
						Iskustvo iz realnih proizvoda i platformi, sa fokusom na rezultate koji
						donose vrijednost klijentima.
					</p>
				</div>
				<div className='portfolio-items'>{sideProjects.map(renderPortfolioItem)}</div>
			</div>

			<PersonalProjects />
		</section>
	);
}
