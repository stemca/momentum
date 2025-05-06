import { BarChart3, Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { Button } from "@/components/ui/button";

export default function SideNav() {
	const pathname = usePathname();

	const isActive = (href: string) => {
		// Active if pathname starts with href
		return pathname === href;
	};

	return (
		<div className="flex h-screen flex-col border-r p-4">
			<div className="mb-8">
				{/* app icon */}
				<h2 className="text-center font-bold text-3xl tracking-tight">
					momentum
				</h2>
			</div>

			<nav className="flex flex-col space-y-2">
				<NavItem
					href="/home"
					icon={<Home className="h-5 w-5" />}
					label="Home"
					active={isActive("/home")}
				/>
				<NavItem
					href="/home/activities"
					icon={<BarChart3 className="h-5 w-5" />}
					label="Activities"
					active={isActive("/home/activities")}
				/>
				<NavItem
					href="/home/profile"
					icon={<User className="h-5 w-5" />}
					label="Profile"
					active={isActive("/home/profile")}
				/>
				<NavItem
					href="/home/settings"
					icon={<Settings className="h-5 w-5" />}
					label="Settings"
					active={isActive("/home/settings")}
				/>
			</nav>
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
		<Button asChild variant={active ? "default" : "ghost"} className="flex-1">
			<Link href={href}>
				{icon}
				<span>{label}</span>
			</Link>
		</Button>
	);
}
