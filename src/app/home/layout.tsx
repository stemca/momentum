"use client";

import BottomNav from "@/features/home/components/bottom-nav";
import SideNav from "@/features/home/components/side-nav";
import { useIsMobile } from "@/hooks/use-mobile";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	const isMobile = useIsMobile();

	return (
		<div className="flex min-h-screen flex-col">
			{isMobile ? (
				// Mobile Layout
				<div className="flex h-screen flex-col">
					<main className="flex-1 overflow-y-auto pb-16">{children}</main>
					<BottomNav />
				</div>
			) : (
				// Desktop Layout
				<div className="grid h-screen grid-cols-5">
					<SideNav />
					<main className="col-span-3 overflow-y-auto p-6">{children}</main>
					<div>
						<h1>right side</h1>
					</div>
				</div>
			)}
		</div>
	);
}
