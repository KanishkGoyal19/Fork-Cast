export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center text-center min-h-[30vh]">
            <div className="flex flex-col items-center justify-center">
                <img
                    src="/images.png"
                    alt="ForkCast Logo"
                    className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full shadow-xl border-4 border-white mb-4"
                />

                <h1 className="text-3xl md:text-6xl font-bold drop-shadow-xl tracking-tight text-black">
                    ForkCast
                </h1>

                <p className="mt-4 max-w-2xl text-lg md:text-xl font-medium text-black/90 drop-shadow-lg px-4 md:px-6">
                    Enter the ingredients you have on hand and let the chef cook up a personalized recipe — tailored to your dietary needs.
                </p>

            </div>
        </section>
    );
}
