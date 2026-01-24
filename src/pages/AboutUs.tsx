export default function AboutUs() {
	return (
		<section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
			<div className="relative shadow-[var(--color-primary)/40] rounded-2xl overflow-hidden shrink-0">
				<img
					className="max-w-md w-full object-cover rounded-2xl"
					src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
					alt=""
				/>
			</div>
			<div className="text-sm text-text-muted max-w-lg">
				<h1 className="text-xl uppercase font-semibold text-text">
					What we do?
				</h1>
				<div className="w-10 h-0.75 rounded-full bg-linear-to-r from-primary to-primary-dark"></div>
				<p className="mt-8">
					ShopNext is a comprehensive e-commerce platform
					designed to streamline online retail operations.{" "}
				</p>
				<p className="mt-4">
					Whether you're looking for clothes, shoes, or
					accessories, ShopNext provides a seamless shopping
					experience.
				</p>
				<p className="mt-4">
					From retail to e-commerce, ShopNext offers everything
					you need to build a successful online store.
				</p>
			</div>
		</section>
	);
}
