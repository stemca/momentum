import LogoutButton from "@/components/logout-button";
import { getCurrentSession } from "@/services/auth/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const { user, session } = await getCurrentSession();

	if (!user || !session) {
		redirect("/");
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center space-y-4">
			<h1 className="font-bold text-3xl tracking-tight">
				This page is under construction, my bad.
			</h1>
			<LogoutButton />
		</div>
	);
}
