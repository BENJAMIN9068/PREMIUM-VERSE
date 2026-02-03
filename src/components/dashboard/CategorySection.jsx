import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccountSharingCard from './AccountSharingCard';
import ActivationKeyCard from './ActivationKeyCard';
import GiftCardCard from './GiftCardCard';

const CategorySection = ({ category, subscriptions, index }) => {
    const isEmpty = subscriptions.length === 0;

    const getBadgeStyle = (badge) => {
        switch (badge) {
            case 'Account Sharing':
            case 'Account Credentials':
                return 'bg-primary/20 text-primary';
            case 'Activation Keys':
                return 'bg-secondary/20 text-secondary';
            case 'Redemption Codes':
                return 'bg-accent/20 text-accent';
            case 'Mixed':
                return 'bg-warning/20 text-warning';
            default:
                return 'bg-white/10 text-gray-300';
        }
    };

    const renderCard = (subscription, subIndex) => {
        if (subscription.credentialType === 'account') {
            return <AccountSharingCard key={subscription.id} subscription={subscription} index={subIndex} />;
        }
        if (subscription.credentialType === 'gift') {
            return <GiftCardCard key={subscription.id} subscription={subscription} index={subIndex} />;
        }
        return <ActivationKeyCard key={subscription.id} subscription={subscription} index={subIndex} />;
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
        >
            {/* Category Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-xl font-bold text-white font-display">{category.name}</h2>
                    {!isEmpty && (
                        <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full">
                            {subscriptions.length}
                        </span>
                    )}
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getBadgeStyle(category.badge)}`}>
                    {category.badge}
                </span>
            </div>

            {/* Cards or Empty State */}
            {isEmpty ? (
                <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center">
                    <span className="text-4xl opacity-30 block mb-3">{category.icon}</span>
                    <p className="text-gray-400 mb-4">No subscriptions in this category</p>
                    <Link to="/home" className="inline-flex items-center gap-1 text-primary text-sm hover:underline">
                        Browse {category.name} <ChevronRight size={14} />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {subscriptions.map((sub, subIndex) => renderCard(sub, subIndex))}
                </div>
            )}
        </motion.section>
    );
};

export default CategorySection;
