export default function AboutUs() {
    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
                <div className="relative shadow-[var(--color-primary)/40] rounded-2xl overflow-hidden shrink-0">
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
                        alt="" />
                </div>
                <div className="text-sm text-text-muted max-w-lg">
                    <h1 className="text-xl uppercase font-semibold text-text">What we do?</h1>
                    <div className="w-10 h-0.75 rounded-full bg-linear-to-r from-primary to-primary-dark"></div>
                    <p className="mt-8">ShopNext is a comprehensive e-commerce platform designed to streamline online retail operations. </p>
                    <p className="mt-4">Whether you're looking for clothes, shoes, or accessories, ShopNext provides a seamless shopping experience.</p>
                    <p className="mt-4">From retail to e-commerce, ShopNext offers everything you need to build a successful online store.</p>
                    <a href="#" className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition g-linear-to-r from-primary to-primary-dark py-3 px-8 rounded-full text-text-inverse">
                        <span>Read more</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="currentColor" /> 
                        </svg>
                    </a>
                </div>
            </section>
        </>
    );
};