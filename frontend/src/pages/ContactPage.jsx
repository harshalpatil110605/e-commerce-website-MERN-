import { useState } from 'react';

/**
 * Contact Page
 * Contact form and information
 */
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock form submission
        console.log('Contact form submitted:', formData);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h3 className="text-2xl font-bold text-green-900 mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-green-700">
                                    Thank you for contacting us. We'll get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8">
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="harshal@gmail.com"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="input-field resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>

                                    <button type="submit" className="btn-primary w-full">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                            Contact Information
                        </h2>

                        <div className="space-y-6">
                            {/* Address */}
                            <div className="bg-white rounded-2xl shadow-soft p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                                        <p className="text-gray-600">
                                            102 PLATINUM BUISNESS HUB<br />
                                            SURAT, GUJRAT<br />
                                            BHARAT
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="bg-white rounded-2xl shadow-soft p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                                        <p className="text-gray-600">
                                            +91 9876543210<br />
                                            Mon-Fri: 9AM - 6PM EST
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-2xl shadow-soft p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                                        <p className="text-gray-600">
                                            info@yahoo.com<br />
                                            support@yahoo.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="mt-8 bg-gray-900 text-white rounded-2xl p-6">
                            <h3 className="font-display font-semibold text-xl mb-4">Business Hours</h3>
                            <div className="space-y-2 text-gray-300">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
