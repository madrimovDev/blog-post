import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_ui/navbar";
import BreadCrumbs from "./_ui/bread-crumbs";
import GTranslate from "./_ui/g-translate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme='dark'>
			<body className={inter.className}>
				<GTranslate />
				<div className="max-w-screen-lg mx-auto px-4">
					<Navbar />
					<BreadCrumbs />
					{children}
					<BreadCrumbs />
				</div>
			</body>
		</html>
	);
}

