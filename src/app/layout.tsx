import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>{children}</body>
		</html>
	);
}
