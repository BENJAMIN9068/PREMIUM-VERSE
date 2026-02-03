import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Premium Verse Logo" className="w-10 h-10 object-contain" />
                            <span className="text-lg font-bold font-display text-white">PREMIUM<span className="text-primary">VERSE</span></span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your one-stop destination for premium digital subscriptions at unbeatable prices. Genuine keys, instant delivery.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-display">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Support</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Track Order</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Become a Reseller</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-display">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Refund Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-display">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to get exclusive deals and drops.</p>
                        <form className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <button type="button" className="w-full bg-white text-black font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2024 PremiumVerse. All rights reserved.</p>
                    <div className="flex items-center space-x-4">
                        {/* Payment Icons Placeholder - using text for now or SVGs if available */}
                        <div className="h-6 w-10 bg-white/10 rounded"></div>
                        <div className="h-6 w-10 bg-white/10 rounded"></div>
                        <div className="h-6 w-10 bg-white/10 rounded"></div>
                        <div className="h-6 w-10 bg-white/10 rounded"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
