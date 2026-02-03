import { Star, BadgeCheck } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Rahul Sharma',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100',
        text: "Got Netflix premium at just ₹499 for a year! Instant delivery and working perfectly. Highly recommended!",
        product: 'Netflix Premium'
    },
    {
        id: 2,
        name: 'Priya Singh',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
        text: "Amazing service! Windows 11 Pro key activated smoothly. Best prices in India!",
        product: 'Windows 11 Pro'
    },
    {
        id: 3,
        name: 'Amit Patel',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
        text: "ChatGPT Plus at this price is a steal. Customer support is very helpful and guided me through the setup.",
        product: 'ChatGPT Plus'
    },
    {
        id: 4,
        name: 'Sneha Gupta',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
        text: "I was skeptical at first, but the Spotify Premium upgrade worked flawlessly. Will buy again!",
        product: 'Spotify Premium'
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-transparent overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">What Our Customers Say</h2>
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-gray-400 font-medium">4.9/5 Average Rating</span>
                </div>
            </div>

            {/* Marquee Effect Container */}
            <div className="relative w-full overflow-hidden mask-gradient-x">
                <div className="flex animate-scroll hover:[animation-play-state:paused] gap-6 w-max px-4">
                    {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
                        <div key={`${item.id}-${index}`} className="w-80 md:w-96 bg-[#0f0f11] border border-white/5 p-6 rounded-2xl flex-shrink-0">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                                <div>
                                    <h4 className="text-white font-bold flex items-center gap-1">
                                        {item.name}
                                        <BadgeCheck size={14} className="text-primary fill-primary/10" />
                                    </h4>
                                    <p className="text-xs text-primary">{item.product}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-500 mb-3 text-xs">
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">"{item.text}"</p>
                        </div>
                    ))}
                </div>
                {/* Second row scrolling opposite direction could be added here for more dynamic feel */}
            </div>

            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
};

export default Testimonials;
