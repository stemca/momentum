export default function HomeLayout({
	children,
}: { children: React.ReactNode }) {
	return <div className="h-screen w-screen">{children}</div>;
}
