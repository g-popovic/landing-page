import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScriptSetup from "@/components/util/ScriptSetup";

export default function Home() {
	return (
		<div className='page-container'>
			<Navigation />
			<Hero />
			<Services />
			<About />
			<Portfolio />
			<Contact />
			<Footer />

			<ScriptSetup />
		</div>
	);
}
