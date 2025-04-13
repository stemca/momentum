import Navbar from "@/features/public/components/navbar";

export default function PublicLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
