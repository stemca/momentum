export default function Features() {
	return (
		<section
			id="features"
			className="flex w-full items-center justify-center bg-emerald-50 py-12 md:py-24 dark:bg-emerald-950/20"
		>
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="font-bold text-3xl text-emerald-700 tracking-tight sm:text-4xl dark:text-emerald-400">
							Features designed for fitness enthusiasts
						</h2>
						<p className="max-w-[700px] text-muted-foreground md:text-lg">
							Everything you need to track your workouts, challenge friends, and
							stay motivated.
						</p>
					</div>
				</div>
				<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
						<div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-6 w-6 text-emerald-600"
								role="img"
								aria-label="Track your progress"
							>
								<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
								<path d="m9 12 2 2 4-4" />
							</svg>
						</div>
						<h3 className="font-bold text-foreground text-xl">
							Track Progress
						</h3>
						<p className="text-center text-muted-foreground">
							Log workouts, track your progress, and see your improvements over
							time.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
						<div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-6 w-6 text-emerald-600"
								role="img"
								aria-label="Socialized plans"
							>
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
								<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</div>
						<h3 className="font-bold text-foreground text-xl">
							Social Challenges
						</h3>
						<p className="text-center text-muted-foreground">
							Create and join challenges with friends to stay motivated and
							accountable.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
						<div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-6 w-6 text-emerald-600"
								role="img"
								aria-label="Personalized plans"
							>
								<path d="M12 20h9" />
								<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
							</svg>
						</div>
						<h3 className="font-bold text-foreground text-xl">
							Personalized Plans
						</h3>
						<p className="text-center text-muted-foreground">
							Get customized workout plans based on your goals and fitness
							level.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
