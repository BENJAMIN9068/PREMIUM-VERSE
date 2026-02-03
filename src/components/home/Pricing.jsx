import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const PricingCard = ({ tier, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className={clsx(
                "relative p-8 rounded-3xl border flex flex-col h-full bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105",
                tier.featured
                    ? "border-primary/50 shadow-[0_0_50px_-12px_rgba(14,165,233,0.3)]"
                    : "border-white/10 hover:border-white/20"
            )}
        >
            {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-white/60 text-sm h-10">{tier.description}</p>
            </div>

            <div className="mb-8">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-white/40">/month</span>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-white/80">
                        <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                className={clsx(
                    "w-full py-4 rounded-xl font-bold transition-all duration-300",
                    tier.featured
                        ? "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)]"
                        : "bg-white/10 text-white hover:bg-white/20 checkbox-border"
                )}
            >
                {tier.cta}
            </button>

            {/* Background glow for featured */}
            {tier.featured && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl -z-10 pointer-events-none"></div>
            )}
        </motion.div>
    );
};

const Pricing = () => {
    const tiers = [
        {
            name: "Starter",
            price: "$29",
            description: "Essential tools for digital nomads.",
            features: [
                "Access to basic software keys",
                "24/7 automated delivery",
                "Standard support",
                "30-day warranty"
            ],
            cta: "Get Started",
            featured: false
        },
        {
            name: "Pro Cosmic",
            price: "$99",
            description: "Complete access for power users.",
            features: [
                "All software keys included",
                "Priority hyperspace delivery",
                "Premium support access",
                "Lifetime warranty",
                "Exclusive beta access"
            ],
            cta: "Go Cosmic",
            featured: true
        },
        {
            name: "Enterprise",
            price: "$299",
            description: "For teams conquering the galaxy.",
            features: [
                "Bulk license management",
                "Dedicated account manager",
                "API access",
                "Custom billing",
                "SLA guarantee"
            ],
            cta: "Contact Sales",
            featured: false
        }
    ];

    return (
        <section className="py-32 px-6 relative bg-black overflow-hidden" id="pricing">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold mb-6"
                    >
                        Choose Your <span className="text-primary">Trajectory</span>
                    </motion.h2>
                    <p className="text-white/60 text-lg">
                        Flexible plans designed to scale with your ambitions alongside the stars.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <PricingCard key={index} tier={tier} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
