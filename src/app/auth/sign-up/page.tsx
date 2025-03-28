import { Button } from "@/components/ui/button";
import SignUpForm from "@/features/auth/components/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
	return (
		<div className="flex h-full w-full items-center justify-center bg-slate-50 p-4">
			<div className="flex min-h-3/4 w-full max-w-6xl rounded-xl bg-white shadow-sm">
				<div className="flex w-full flex-col space-y-6 p-8 sm:p-12 md:w-1/2">
					<div className="mb-8">
						<h1 className="font-bold text-3xl tracking-tighter">
							Create an account
						</h1>
					</div>

					<SignUpForm />

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

					<Button variant="outline" className="w-full">
						Google
					</Button>
					<Button variant="outline" className="w-full">
						Discord
					</Button>

					<div className="text-center text-sm">
						<p>
							Have an account?{" "}
							<Button asChild variant="link">
								<Link href="/auth/sign-in">Log in</Link>
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
