import React from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            {/* Hero Section */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/" className="hover:text-naturoGreen">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">Contact Us</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 -mt-10">
                {/* title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-4xl font-serif font-semibold text-emerald-900 mb-4">
                        We&apos;d Love to Hear from You
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Whether you have a question about our products, need assistance with an order, or just want to share your thoughts, we are here for you.
                    </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Information Card */}
                    <div className="lg:col-span-1 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
                        <div>
                            <h3 className="text-2xl font-serif font-semibold text-emerald-900 mb-6">Contact Info</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-700">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Our Location</p>
                                        <p className="text-gray-600">Level-5, Noor Tower, <br />110 Bir Uttam CR Dutta Rd, Dhaka</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-700">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Phone Number</p>
                                        <p className="text-gray-600">09639812525</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-700">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Email Address</p>
                                        <p className="text-gray-600">hello@naturo.com</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <h4 className="text-emerald-900 font-semibold mb-4">Follow Our Journey</h4>
                            <div className="flex gap-4">
                                <a href="#" className="p-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-700 hover:text-white transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="p-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-700 hover:text-white transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="p-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-700 hover:text-white transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-emerald-100">
                        <h3 className="text-3xl font-serif font-semibold text-emerald-900 mb-8">Send a Message</h3>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Your message here..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 pt-4">
                                <button className="w-full md:w-auto px-8 py-4 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-200">
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16 rounded-2xl overflow-hidden h-96 shadow-sm border border-emerald-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.913417956766!2d90.38537!3d23.74882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c7d4c1e8b1%3A0x0!2sBir%20Uttam%20C%20R%20Datta%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;