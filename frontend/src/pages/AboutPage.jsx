/**
 * About Page
 * Information about the brand and company
 */
const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        About LuxeHome
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Creating beautiful, inspiring spaces since 2020
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-6 text-center">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                LuxeHome was born from a simple belief: your home should be a sanctuary that reflects
                                your unique style and personality. Founded in 2020, we set out to curate a collection
                                of premium home decor and furniture that combines timeless elegance with modern design.
                            </p>
                            <p>
                                Every piece in our collection is carefully selected by our team of design experts who
                                travel the world to discover the finest craftsmanship and most innovative designs.
                                We partner with skilled artisans and renowned manufacturers who share our commitment
                                to quality and sustainability.
                            </p>
                            <p>
                                What sets us apart is our dedication to making luxury accessible. We believe that
                                everyone deserves to live in a beautiful space, which is why we work tirelessly to
                                offer premium products at fair prices, without compromising on quality or design.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-gray-900 mb-12 text-center">
                        Our Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                                Quality First
                            </h3>
                            <p className="text-gray-600">
                                We never compromise on quality. Every product is rigorously tested and inspected
                                to ensure it meets our high standards.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                                Customer Focused
                            </h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We're here to help you create the home of
                                your dreams with personalized service and support.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                                Sustainability
                            </h3>
                            <p className="text-gray-600">
                                We're committed to sustainable practices, from sourcing eco-friendly materials
                                to minimizing our environmental impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 mb-12">
                            Our passionate team of designers, curators, and customer service experts work
                            together to bring you the best in home decor and furniture.
                        </p>
                        <p className="text-lg text-gray-600">
                            Have questions or need design advice? We're always here to help you create
                            the perfect space.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
