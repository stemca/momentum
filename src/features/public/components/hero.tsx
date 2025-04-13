import Image from "next/image";

export default function Hero() {
	return (
		<section
			id="hero"
			className="mx-auto flex w-full max-w-5xl items-center justify-center py-12 md:py-24 lg:py-32 xl:py-40"
		>
			<div className="container px-4 md:px-6">
				<div className="grid gap-8 lg:grid-cols-[1fr_450px] lg:gap-12">
					<div className="flex flex-col justify-center space-y-6">
						<div className="space-y-4">
							<h1 className="text-center font-bold text-3xl text-emerald-600 tracking-tight sm:text-4xl lg:text-left xl:text-5xl">
								Track workouts together. Achieve more.
							</h1>
							<p className="text-center text-muted-foreground md:text-lg lg:text-left">
								Momentum is a social workout app that helps you and your friends
								track progress, set challenges, and achieve your fitness goals
								together.
							</p>
						</div>
						{/* <div className="flex flex-col justify-center gap-3 lg:justify-start min-[400px]:flex-row">
							<Button size="lg">Get Started</Button>
							<Button size="lg" variant="outline">
								Learn More
							</Button>
						</div> */}
					</div>
					<div className="relative flex items-center justify-center">
						<div className="relative w-full max-w-[400px] overflow-hidden rounded-xl border border-border shadow-sm">
							<Image
								loading="eager"
								src="/run.avif"
								alt="Track workouts with friends using Momentum"
								width={400}
								height={500}
								className="object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
