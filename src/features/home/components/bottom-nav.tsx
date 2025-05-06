import { BarChart3, Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

export default function BottomNav() {
	const pathname = usePathname();

	const isActive = (href: string) => {
		// Active if pathname starts with href
		return pathname === href;
	};

	return (
		<div className="fixed right-0 bottom-0 left-0 flex h-16 items-center justify-around border-t bg-background px-4">
			<NavItem
				href="/home"
				icon={<Home className="h-6 w-6" />}
				label="Home"
				active={isActive("/home")}
			/>
			<NavItem
				href="/home/activities"
				icon={<BarChart3 className="h-6 w-6" />}
				label="Activities"
				active={isActive("/home/activities")}
			/>
			<NavItem
				href="/home/profile"
				icon={<User className="h-6 w-6" />}
				label="Profile"
				active={isActive("/home/profile")}
			/>
			<NavItem
				href="/home/settings"
				icon={<Settings className="h-6 w-6" />}
				label="Settings"
				active={isActive("/home/settings")}
			/>
		</div>
	);
}

interface NavItemProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	active?: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
	return (
		<Link href={href} className="flex flex-col items-center justify-center">
			<div
				className={`rounded-full p-1 ${active ? "text-primary" : "text-muted-foreground"}`}
			>
				{icon}
			</div>
			<span
				className={`mt-1 text-xs ${active ? "font-medium text-primary" : "text-muted-foreground"}`}
			>
				{label}
			</span>
		</Link>
	);
}
