import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { Providers } from "./providers";

import "./globals.css";

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
				<Toaster richColors theme="light" />
			</body>
		</html>
	);
}
