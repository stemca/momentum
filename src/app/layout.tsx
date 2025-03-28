import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Momentum",
	description: "A social workout platform",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} font-sans antialiased`}>
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
