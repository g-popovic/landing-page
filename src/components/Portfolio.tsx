import "./Portfolio.css";
import Image from "next/image";
import projectImage1 from "../../public/portfolio/project-1.png";
import projectImage2 from "../../public/portfolio/project-2.png";
import projectImage3 from "../../public/portfolio/project-3.png";

const portfolioItems = [
	{
		id: 1,
		title: "Corporate Website",
		description: "Moderna korporativna web stranica sa CMS sistemom i multi-language podrškom.",
		tags: ["React", "Next.js", "Strapi"],
		image: projectImage1
	},
	{
		id: 2,
		title: "E-commerce Platform",
		description: "Kompletna e-commerce platforma sa inventory management i payment processing.",
		tags: ["Vue.js", "Laravel", "Stripe"],
		image: projectImage2
	},
	{
		id: 3,
		title: "Mobile App",
		description: "Cross-platform mobilna aplikacija za food delivery sa real-time tracking.",
		tags: ["React Native", "Firebase", "Maps API"],
		image: projectImage3
	},
	{
		id: 4,
		title: "Corporate Website",
		description: "Moderna korporativna web stranica sa CMS sistemom i multi-language podrškom.",
		tags: ["React", "Next.js", "Strapi"],
		image: projectImage1
	}
];

export default function Portfolio() {
	function renderPortfolioItem(item: (typeof portfolioItems)[0]) {
		return (
			<div className='portfolio-item card animate-in' key={item.id} data-index={item.id}>
				<div className='portfolio-content'>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					<div className='portfolio-tags'>
						{item.tags.map(tag => (
							<span className='tag' key={tag}>
								{tag}
							</span>
						))}
					</div>
				</div>
				<div className='portfolio-image'>
					<Image src={item.image} alt={item.title} fill={true} />
				</div>
			</div>
		);
	}

	return (
		<section id='portfolio' className='portfolio'>
			<div className='container'>
				<div className='section-header animate-in'>
					<h2>Naš rad</h2>
					<p>Pogledajte neke od projekata koje smo realizovali</p>
				</div>
				<div className='portfolio-grid'>{portfolioItems.map(renderPortfolioItem)}</div>
			</div>
		</section>
	);
}
