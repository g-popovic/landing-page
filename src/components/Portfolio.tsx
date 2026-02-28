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
			"Relive je platforma, bazirana u Holandiji, koja omogućava praćenje aktivnosti poput trčanja, biciklizma i planinarenja, sa mobilnom i web aplikacijom. Koriste je preko 20 miliona korisnika širom sveta. Radio sam u multi-disciplinarnom timu na ključnim dijelovima proizvoda koji utiču na svakodnevno iskustvo korisnika. U toku svog radnog iskustva, smanjio sam troškove infrastrukture za oko 3000 EUR mjesečno, i značajno poboljšao rang na Google pretrazi kroz SEO optimizaciju.",
		image: reliveImage,
		link: "https://relive.com"
	},
	{
		id: 2,
		title: "Camea",
		date: "Jan - Jun 2021 ",
		description:
			"Camea je platforma koja se fokusira na digitalizaciju pronalaženja osobe za pomoć po kući, bazirana u Njemačkoj. Bio sam odgovoran za razvoj glavnih funkcionalnosti sajta. Sopstvenom inicijativom uveo sam moderne tehnologije i prakse koje su značajno smanjile vreme razvoja i poboljšale kvalitet proizvoda, poput automatskog testiranja.",
		image: cameaImage,
		link: "https://www.linkedin.com/company/cameacare"
	},
	{
		id: 3,
		title: "Ether",
		date: "Nov - Dec 2020",
		description:
			"Ether je društvena aplikacija koja povezuje ljude na osnovu njihove lokacije i interesovanja. Kao jedini programer u timu, samostalno sam razvio sam čitavu back-end infrastrukturu i API za aplikaciju od nule u duplo kraćem roku od onog što je planirano. Rezultirajući sistem je bio stabilan, brz, i testiran sa preko 100,000 virtualnih korisnika.",
		image: etherImage
	}
];

const sideProjects: ProjectItem[] = [
	{
		id: 4,
		title: "Cablo",
		date: `2024 - ${currentYear}`,
		description:
			"Cablo je platforma za digitalizaciju licnog prevoza i taksi servisa u Crnoj Gori, nalik Uber-a. Dozvoljava korisnicima da zakažu vožnju putem aplikacije u bilo koje vrijeme širom teritorije Crne Gore, što rešava problem nedovoljne dostupnosti taksi servisa i tražnja posebnog broja taksija u svakom pojedinačnom gradu. Zajedno sa dvoje programera, razvili smo čitav sistem (aplikaciju, sajt, i server) od nule.",
		image: cabloImage
	},
	{
		id: 5,
		title: "Montenegro Luxury Association",
		date: "2022 - 2023",
		description:
			"Radio u timu na izradi digitalne platforme za Montenegro Luxury Association, organizacija koja promoviše luksuzni turizam u Crnoj Gori na globalnom tržištu kroz brojna partnerstva i projekte. Razvio sam ključne funkcionalnosti na web sajtu za bukiranje luksuznog smještaja i usluga u Crnoj Gori koristeći moderne tehnologije.",
		image: mneLuxImage
	},
	{
		id: 6,
		title: "Bionize",
		date: "Jun - Oct 2022",
		description:
			"Bionize je browser dodatak koji automatski prilagođava tekst na web stranicama kako bi sadržaj bio lakši i brži za čitanje. Proizvod je prešao 3000+ preuzimanja u roku od dvije nedelje i pokazao koliko dobro osmišljen UX detalj može odmah povećati upotrebljivost.",
		image: bionizeImage
	}
];

export default function Portfolio() {
	function renderPortfolioItem(item: ProjectItem) {
		return (
			<a href={item.link} target='_blank' className='' key={item.id} data-index={item.id}>
				<div className='portfolio-item card animate-in highlighted-1'>
					<div className='portfolio-content'>
						<div className='portfolio-content-header'>
							<h3>{item.title}</h3>
							<p>{item.date}</p>
						</div>

						<p className='portfolio-description'>{item.description}</p>

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
