import LogoutButton from "@/components/logout-button";

export default function HomePage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center bg-red-200">
			<h1>Home page</h1>
			<LogoutButton />
		</div>
	);
}
