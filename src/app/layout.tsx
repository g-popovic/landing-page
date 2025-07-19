import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
	title: "Quark Digital - Web Development Agency Montenegro",
	description:
		"Profesionalna web development agencija iz Crne Gore. Specijalizovani za moderne web aplikacije, e-commerce i digitalna rešenja."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='sr'>
			<body className={`${poppins.className} ${montserrat.className}`}>{children}</body>
		</html>
	);
}
