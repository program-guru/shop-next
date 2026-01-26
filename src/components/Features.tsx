import { Zap, Footprints, Truck, ShieldCheck } from "lucide-react";

export default function Features() {
	const featuresData = [
		{
			icon: Zap,
			title: "Ultra-light Performance",
			description:
				"Engineered for speed with breathable, lightweight materials.",
		},
		{
			icon: Footprints,
			title: "All-day Comfort Fit",
			description:
				"Ergonomic cushioning designed for long wear without fatigue.",
		},
		{
			icon: ShieldCheck,
			title: "Premium Build Quality",
			description:
				"Durable materials tested for everyday and athletic use.",
		},
		{
			icon: Truck,
			title: "Fast & Free Delivery",
			description:
				"Quick doorstep delivery with easy returns and exchanges.",
		},
	];

	return (
		<>
			<div className="text-center">
				<p
					className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium
					bg-surface
					border-border
					text-primary-dark"
				>
					Why Choose Us
				</p>

				<h2 className="mt-4 text-3xl font-semibold font-heading">
					Built for movement
				</h2>

				<p className="mt-2 max-w-xl mx-auto text-text-muted">
					Performance footwear designed for comfort, durability,
					and style.
				</p>
			</div>

			<div className="mt-10 flex flex-wrap justify-center gap-6 px-6">
				{featuresData.map((feature, index) => {
					const Icon = feature.icon;

					return (
						<div
							key={index}
							className={`transition-transform duration-300 hover:-translate-y-1`}
						>
							<div
								className="h-full max-w-80 rounded-xl border p-6 space-y-4
									bg-surface
									border-border"
							>
								<Icon
									size={32}
									strokeWidth={1.5}
									className="text-primary"
								/>

								<h3 className="text-base font-medium">
									{feature.title}
								</h3>

								<p className="text-sm text-text-muted">
									{feature.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
