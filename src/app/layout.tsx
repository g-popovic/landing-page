import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
			<body className={`${poppins.className} ${robotoMono.className}`}>{children}</body>
		</html>
	);
}
