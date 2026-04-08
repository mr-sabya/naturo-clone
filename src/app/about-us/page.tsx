import React from 'react';
import Head from 'next/head';

const AboutPage = () => {
    return (
        <div className="bg-[#fffbeb] text-gray-800 font-sans">
            <Head>
                <title>About Us | Prakritiz - Rooted in Nature</title>
                <meta name="description" content="Discover the story behind Prakritiz and our journey toward sustainable, organic living." />
            </Head>

            {/* --- Hero Section --- */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
                        alt="Nature Background"
                        className="w-full h-full object-cover brightness-50"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 italic">Prakritiz</h1>
                    <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto font-light">
                        Bringing the soul of the Earth back to modern living.
                    </p>
                </div>
            </section>

            {/* --- Our Mission & Stats --- */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-sm uppercase tracking-widest text-emerald-700 font-bold mb-2">Our Mission</h2>
                        <h3 className="text-4xl font-serif leading-tight mb-6 text-gray-900">
                            We believe that purity shouldn&apos;t be a luxury—it should be a way of life.
                        </h3>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Prakritiz started with a simple observation: the further we move from nature, the further we move from ourselves. Our journey began in the lush landscapes of India, sourcing the finest organic ingredients directly from farmers who respect the soil.
                        </p>
                        <div className="flex gap-8 border-t border-emerald-100 pt-8">
                            <div>
                                <span className="block text-3xl font-serif text-emerald-800">100%</span>
                                <span className="text-sm text-gray-500 uppercase">Organic Sourced</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-serif text-emerald-800">50+</span>
                                <span className="text-sm text-gray-500 uppercase">Local Farmers</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-serif text-emerald-800">0%</span>
                                <span className="text-sm text-gray-500 uppercase">Chemicals</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=1000"
                            alt="Organic Farming"
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-emerald-900 text-white p-8 rounded-2xl hidden lg:block">
                            <p className="italic font-serif text-xl">&quot;Nature never hurries, yet everything is accomplished.&quot;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Core Values --- */}
            <section className="bg-emerald-900 py-20 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif mb-4">The Prakritiz Philosophy</h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 border border-emerald-800 rounded-xl hover:bg-emerald-800 transition">
                            <div className="text-4xl mb-4">🌱</div>
                            <h4 className="text-xl font-bold mb-2">Sustainability First</h4>
                            <p className="text-emerald-200 font-light text-sm leading-relaxed">
                                From biodegradable packaging to carbon-neutral shipping, we ensure our footprint is as light as a fallen leaf.
                            </p>
                        </div>
                        <div className="p-8 border border-emerald-800 rounded-xl hover:bg-emerald-800 transition">
                            <div className="text-4xl mb-4">🤝</div>
                            <h4 className="text-xl font-bold mb-2">Ethical Sourcing</h4>
                            <p className="text-emerald-200 font-light text-sm leading-relaxed">
                                We cut out the middlemen. We work directly with small-scale artisans and farmers to ensure fair wages.
                            </p>
                        </div>
                        <div className="p-8 border border-emerald-800 rounded-xl hover:bg-emerald-800 transition">
                            <div className="text-4xl mb-4">🛡️</div>
                            <h4 className="text-xl font-bold mb-2">Radical Honesty</h4>
                            <p className="text-emerald-200 font-light text-sm leading-relaxed">
                                Every ingredient is traceable. No hidden fillers, no synthetic fragrances, no compromise.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- The Founder / Story Section --- */}
            <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-bold mb-10">Our Roots</h2>
                <p className="text-2xl md:text-4xl font-serif text-gray-800 leading-[1.6]">
                    &quot;Prakritiz was born from a desire to heal. We wanted to create products that don&apos;t just serve a purpose, but tell a story of heritage, love, and respect for our environment.&quot;
                </p>
                <div className="mt-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                        <img src="https://i.pravatar.cc/150?u=founder" alt="Founder" />
                    </div>
                    <h5 className="font-bold text-lg">Sabyasachi Roy</h5>
                    <p className="text-gray-500 italic">Visionary & Founder</p>
                </div>
            </section>

            {/* --- Final CTA --- */}
            <section className="py-20 bg-emerald-50 text-center px-6">
                <h2 className="text-3xl font-serif mb-6">Want to join the green revolution?</h2>
                <button className="bg-emerald-800 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl hover:shadow-2xl">
                    Explore Our Collection
                </button>
            </section>
        </div>
    );
};

export default AboutPage;