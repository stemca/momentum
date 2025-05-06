import { DiscordLogoIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import RegisterForm from "@/features/auth/components/register-form";

export const metadata = {
	title: "Sign Up | Momentum",
} satisfies Metadata;

export default function RegisterPage() {
	return (
		<div className="flex h-full w-full items-center justify-center p-4">
			<div className="flex min-h-fit w-full max-w-6xl rounded-xl bg-background shadow-sm">
				<div className="flex w-full flex-col space-y-6 p-8 sm:p-12 md:w-1/2">
					<h1 className="font-bold text-3xl tracking-tighter">
						Create an account
					</h1>

					<RegisterForm />

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<Button variant="outline" className="w-full" asChild>
						<Link href="/auth/login/discord" prefetch={false}>
							<DiscordLogoIcon />
							Discord
						</Link>
					</Button>

					<div className="text-center text-sm">
						<p>
							Have an account?{" "}
							<Button asChild variant="link">
								<Link href="/auth/login">Log in</Link>
							</Button>
						</p>
					</div>
				</div>

				<div
					className="hidden rounded-r-xl bg-center bg-cover md:flex md:w-1/2 md:flex-col md:justify-center md:p-8 lg:p-12"
					style={{ backgroundImage: 'url("/weights.avif")' }}
				/>
			</div>
		</div>
	);
}
