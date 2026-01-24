interface TeamMember {
	name: string;
	role: string;
	image: string;
}

export default function TeamSection() {
	const teamMembers: TeamMember[] = [
		{
			name: "Aaditya Mall",
			role: "Product Design",
			image:
				"/Team/aaditya_profile.jpeg",
		},
		{
			name: "Shivam Kulkarni",
			role: "Engineering",
			image:
				"/Team/shivam_profile.jpg",
		},
		{
			name: "Mansi Chudasama",
			role: "Marketing & Growth",
			image:
				"/Team/mansi_profile.png",
		},
	];

	return (
		<section className="py-16 px-4">
			<div className="max-w-6xl mx-auto text-center">
				<h1 className="text-3xl font-heading font-semibold text-text">
					Meet Our Team
				</h1>
				<p className="mt-2 text-text-muted">
					The people behind ShopNext, passionate about design,
					quality, and customer experience.
				</p>

				<div className="flex flex-wrap items-center justify-center gap-8 mt-12">
					{teamMembers.map((member, index) => (
						<div
							key={index}
							className="max-w-80 w-full rounded-2xl
								border border-border bg-surface
								overflow-hidden transition-transform
								hover:-translate-y-1"
						>
							<div className="relative overflow-hidden">
								<img
									src={member.image}
									alt={member.name}
									className="h-70 w-full object-cover object-top
										transition-transform duration-300
										hover:scale-105"
								/>
								<div className="absolute inset-x-0 bottom-0 h-32
									bg-linear-to-t from-black/70 to-transparent"
								/>
							</div>

							<div className="px-4 py-6 text-center">
								<p className="text-lg font-medium text-text">
									{member.name}
								</p>
								<p className="text-sm font-medium text-primary">
									{member.role}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
