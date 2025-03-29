import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SignInForm from "@/features/auth/components/sign-in-form";

export const metadata = {
	title: "Sign In | Momentum",
} satisfies Metadata;

export default function SignUpPage() {
	return (
		<div className="flex h-full w-full items-center justify-center p-4">
			<div className="flex min-h-fit w-full max-w-lg rounded-xl bg-background shadow-sm">
				<div className="flex w-full flex-col space-y-6 p-8 sm:p-12">
					<h1 className="font-bold text-3xl tracking-tighter">Welcome back</h1>

					<SignInForm />

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or login with
							</span>
						</div>
					</div>

					<Button disabled variant="outline" className="w-full">
						Google
					</Button>
					<Button disabled variant="outline" className="w-full">
						Discord
					</Button>

					<div className="text-center text-sm">
						<p>
							Don't have an account?
							<Button asChild variant="link">
								<Link href="/auth/sign-up">Sign up</Link>
							</Button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
