import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: "Momentum",
	description: "A social workout platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Providers>
				<body>{children}</body>
			</Providers>
			<Analytics />
			<SpeedInsights />
		</html>
	);
}
