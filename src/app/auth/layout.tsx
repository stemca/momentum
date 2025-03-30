export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return <div className="h-screen w-screen bg-slate-50">{children}</div>;
}
