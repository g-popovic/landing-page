import "./Portfolio.css";
import Image, { StaticImageData } from "next/image";
import projectImage1 from "../../public/portfolio/project-1.png";
import projectImage2 from "../../public/portfolio/project-2.png";
import projectImage3 from "../../public/portfolio/project-3.png";

const currentYear = new Date().getFullYear();

type ProjectItem = {
	id: number;
	title: string;
	date: string;
	description: string;
	image: StaticImageData;
};

const workExperience: ProjectItem[] = [
	{
		id: 1,
		title: "Relive",
		date: "2021 - 2026",
		description:
			"Relive je globalna platforma za praćenje aktivnosti poput trčanja, biciklizma i planinarenja, sa mobilnom aplikacijom i web iskustvom, koju koriste preko 20 miliona korisnika. Radio sam na ključnim dijelovima proizvoda koji utiču na svakodnevno iskustvo korisnika, uz redovne isporuke i mjerljivo smanjenje operativnih troškova za oko 3000 EUR mjesečno.",
		image: projectImage1
	},
	{
		id: 2,
		title: "Camea",
		date: "Jan - Jun 2021 ",
		description:
			"Camea je platforma koja modernizuje caregiving usluge i olakšava povezivanje korisnika sa pružaocima njege. Vodio sam razvoj glavnih funkcionalnosti kako bi proizvod brže došao do korisnika i imao stabilnu osnovu za rast.",
		image: projectImage2
	},
	{
		id: 3,
		title: "Ether",
		date: "Nov - Dec 2020",
		description:
			"Ether je location-based društvena aplikacija koja povezuje ljude kroz lokalni sadržaj i interakciju. Preuzeo sam razvoj ključnih dijelova platforme i pomogao timu da MVP bude spreman znatno prije plana, što je omogućilo ranije testiranje ideje na tržištu.",
		image: projectImage3
	}
];

const sideProjects: ProjectItem[] = [
	{
		id: 1,
		title: "Cablo",
		date: `2024 - ${currentYear}`,
		description:
			"Cablo je platforma za digitalizaciju licnog prevoza i taxi servisa u Crnoj Gori, nalik Uber-a. Dozvoljava korisnicima da zakažu vožnju putem aplikacije u bilo koje vrijeme širom teritorije Crne Gore. Zajedno sa dvoje programera, razvili smo čitav sistem (aplikaciju, sajt, i server) od nule.",
		image: projectImage1
	},
	{
		id: 2,
		title: "Montenegro Luxury Association",
		date: "2022 - 2023",
		description:
			"Za Montenegro Luxury Association razvio sam digitalnu platformu koja bolje predstavlja premium turističku ponudu i olakšava online prisustvo organizacije. Projekat je postavljen od nule, od koncepta do ključnih funkcionalnosti, sa fokusom na stabilan rast.",
		image: projectImage2
	},
	{
		id: 3,
		title: "Bionize",
		date: "Jun - Oct 2022",
		description:
			"Bionize je browser dodatak koji automatski prilagođava tekst na web stranicama kako bi sadržaj bio lakši i brži za čitanje. Proizvod je prešao 3000+ preuzimanja i pokazao koliko dobro osmišljen UX detalj može odmah povećati upotrebljivost.",
		image: projectImage3
	}
];

const learningProjects = [
	{
		id: 4,
		title: "POSTR",
		date: "Maj 2022",
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
		title: "GymBuddy (Pobjednik hakatona)",
		date: "Mart 2021",
		description:
			"Pobjednički projekat sa međunarodnog WinHacks hakatona: platforma koja spaja ljude sa partnerima za trening prema lokaciji i ciljevima. Iskustvo je potvrdilo sposobnost brze isporuke i kvalitetne realizacije pod pritiskom."
	},
	{
		id: 7,
		title: "Ecommerce Website",
		date: "Septembar 2020",
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

export default function Portfolio() {
	function renderPortfolioItem(item: ProjectItem) {
		return (
			<div className='animate-in' key={item.id} data-index={item.id}>
				<div className='portfolio-item card'>
					<div className='portfolio-content'>
						<div className='portfolio-content-header'>
							<h3>{item.title}</h3>
							<p>{item.date}</p>
						</div>

						<p>{item.description}</p>
					</div>
					<div className='portfolio-image'>
						<Image src={item.image} alt={item.title} fill={true} />
					</div>
				</div>
			</div>
		);
	}

	function renderProjectItem(item: (typeof learningProjects)[0]) {
		return (
			<div className='animate-in' key={item.id} data-index={item.id}>
				<div className='portfolio-item card'>
					<div className='portfolio-content'>
						<div className='portfolio-content-header'>
							<h3>{item.title}</h3>
							<p>{item.date}</p>
						</div>

						<p>{item.description}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<section id='portfolio' className='portfolio container'>
			<div className='section-header animate-in'>
				<h2>Radno Iskustvo</h2>
				<p>
					Iskustvo iz realnih proizvoda i platformi, sa fokusom na rezultate koji donose
					vrijednost klijentima.
				</p>
			</div>
			<div className='portfolio-items'>{workExperience.map(renderPortfolioItem)}</div>

			<div className='section-header animate-in'>
				<h2>Projekti i Saradnje</h2>
				<p>
					Iskustvo iz realnih proizvoda i platformi, sa fokusom na rezultate koji donose
					vrijednost klijentima.
				</p>
			</div>
			<div className='portfolio-items'>{sideProjects.map(renderPortfolioItem)}</div>

			<div className='section-header animate-in'>
				<h2>Licni Projekti</h2>
				<p>
					Iskustvo iz realnih proizvoda i platformi, sa fokusom na rezultate koji donose
					vrijednost klijentima.
				</p>
			</div>
			<div className='portfolio-items projects'>
				{learningProjects.map(renderProjectItem)}
			</div>
		</section>
	);
}
