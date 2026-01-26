export default function Information() {
	return (
		<section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
			<div className="relative shadow-[var(--color-primary)/40] rounded-2xl overflow-hidden shrink-0">
				<img
					className="max-w-md w-full object-cover rounded-2xl"
					src="https://images.pexels.com/photos/13920800/pexels-photo-13920800.jpeg"
					alt="Our products and craftsmanship"
				/>
			</div>

			<div className="text-sm text-text-muted max-w-lg">
				<h1 className="text-xl uppercase font-semibold text-text">
					What we do
				</h1>

				<div className="w-10 h-0.75 rounded-full bg-linear-to-r from-primary to-primary-dark"></div>

				<p className="mt-8">
					ShopNext is a modern e-commerce brand built around the
					idea that great footwear should combine comfort,
					durability, and everyday style.
				</p>

				<p className="mt-4">
					We design and curate collections that fit seamlessly
					into daily life—whether you're commuting, traveling,
					working, or spending long hours on your feet.
				</p>

				<p className="mt-4">
					Our product range includes lightweight sneakers, casual
					everyday shoes, and lifestyle footwear crafted using
					breathable fabrics, responsive cushioning, and
					long-lasting outsoles.
				</p>

				<p className="mt-4">
					Every product goes through multiple quality checks to
					ensure comfort, fit accuracy, and performance under
					real-world conditions.
				</p>

				<p className="mt-4">
					ShopNext is not just about selling products—it’s about
					building trust. We focus on transparent pricing, honest
					product descriptions, and consistent quality across
					every collection.
				</p>

				<p className="mt-4">
					Our platform is designed to make shopping simple and
					hassle-free, with fast shipping, easy returns, and
					responsive customer support available whenever you need
					it.
				</p>

				<p className="mt-4">
					As we grow, our mission remains unchanged: create
					footwear people enjoy wearing every day, and deliver it
					with an experience they can rely on.
				</p>
			</div>
		</section>
	);
}
