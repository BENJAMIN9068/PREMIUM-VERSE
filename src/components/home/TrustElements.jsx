import { Zap, ShieldCheck, Headphones, Repeat } from 'lucide-react';

const FEATURES = [
    {
        icon: Zap,
        title: 'Instant Delivery',
        description: 'Get your activation keys delivered to your email within 5 minutes of purchase.'
    },
    {
        icon: ShieldCheck,
        title: '100% Genuine',
        description: 'All our products are sourced directly from authorized resellers. Authentic guaranteed.'
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Our dedicated support team is available round the clock to assist you with any issues.'
    },
    {
        icon: Repeat,
        title: 'Money-back Guarantee',
        description: 'Not satisfied? Get a hassle-free refund within 7 days. No questions asked.'
    }
];

const TrustElements = () => {
    return (
        <section className="py-20 bg-transparent border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Why Choose Us?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We prioritize customer satisfaction and product authenticity above everything else.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon size={32} className="text-white group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustElements;
