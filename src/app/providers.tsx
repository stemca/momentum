"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";

export function Providers(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider
				attribute="class"
				defaultTheme="light"
				disableTransitionOnChange
				enableColorScheme
				enableSystem={false}
			>
				{props.children}
			</NextThemesProvider>
		</QueryClientProvider>
	);
}
