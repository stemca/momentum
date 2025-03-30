import { Activity, LucideMenu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

// const navLinks = [
// 	{ href: "/about", label: "About" },
// 	{ href: "/features", label: "Features" },
// 	{ href: "/pricing", label: "Pricing" },
// ];

export default function Navbar() {
	return (
		<header className="mx-auto flex w-full max-w-screen-lg justify-between px-5 py-6">
			<div className="flex items-center gap-2">
				<Activity className="h-6 w-6 text-emerald-600" />
				<Link href="/" className="font-bold text-xl">
					Momentum
				</Link>
			</div>

			{/* Desktop Buttons */}
			<div className="hidden h-full flex-1 items-center justify-end space-x-4 md:flex">
				<Link href="/auth/sign-in">
					<Button variant="link" className="text-md" size="lg">
						Log in
					</Button>
				</Link>
				<Link href="/auth/sign-up">
					<Button>Sign Up</Button>
				</Link>
			</div>

			{/* Mobile Menu */}
			<div className="flex items-center md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<button aria-label="Open menu" type="button">
							<LucideMenu size={28} />
						</button>
					</SheetTrigger>
					<SheetContent side="right" className="flex flex-col space-y-4 p-6">
						<SheetHeader>
							<SheetTitle />
						</SheetHeader>
						<SheetClose asChild>
							<Link href="/">
								<Button variant="link" className="text-lg">
									Home
								</Button>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href="/auth/sign-in">
								<Button variant="link" className="text-lg">
									Log in
								</Button>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href="/auth/sign-up">
								<Button size="lg">Sign Up</Button>
							</Link>
						</SheetClose>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
