import { redirect } from "next/navigation";

import { getCurrentSession } from "@/services/auth/session";

export default async function HomeLayout({
	children,
}: { children: React.ReactNode }) {
	const { user, session } = await getCurrentSession();
	if (!user || !session) {
		redirect("/");
	}

	return <div className="h-screen w-screen">{children}</div>;
}
