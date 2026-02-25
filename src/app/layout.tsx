import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const title = "Đorđe Popović - Softverski Inženjer";
const description =
	"Softverski Inženjer / programer sa preko 5+ godina radnog iskustva. Specijalizovan u izradi modernih web sajtova i aplikacija.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		images: "/preview.jpg",
		type: "website",
		siteName: title,
		title,
		description
	},
	twitter: {
		title,
		description,
		images: "/preview.jpg"
	}
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
