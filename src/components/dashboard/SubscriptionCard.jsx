import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, RefreshCcw, ChevronRight } from 'lucide-react';
import { getSubscriptionStatus, getProgressPercentage, formatCountdown } from '../../data/mockUserData';
import Button from '../ui/Button';

const SubscriptionCard = ({ subscription, index }) => {
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const statusInfo = getSubscriptionStatus(subscription);
    const progress = getProgressPercentage(subscription);

    const handleCopy = () => {
        navigator.clipboard.writeText(subscription.activationKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusColors = {
        success: 'border-l-success bg-success/5',
        warning: 'border-l-warning bg-warning/5',
        error: 'border-l-error bg-error/5',
    };

    const badgeColors = {
        success: 'bg-success/20 text-success',
        warning: 'bg-warning/20 text-warning',
        error: 'bg-error/20 text-error',
    };

    const progressColors = {
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border-l-4 ${statusColors[statusInfo.color]} bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-white/20 transition-all duration-300 group`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                        {subscription.productLogo}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{subscription.productName}</h3>
                        <p className="text-sm text-gray-400">{subscription.planType}</p>
                    </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${badgeColors[statusInfo.color]} ${statusInfo.status === 'expiring_soon' && statusInfo.daysLeft <= 7 ? 'animate-pulse' : ''}`}>
                    {statusInfo.label}
                </span>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <p className="text-gray-500">Purchased</p>
                    <p className="text-gray-300">{subscription.purchaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                    <p className="text-gray-500">Expires</p>
                    <p className={`font-medium ${statusInfo.color === 'error' ? 'text-error' : statusInfo.color === 'warning' ? 'text-warning' : 'text-success'}`}>
                        {subscription.expiryDate ? subscription.expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never (Lifetime)'}
                    </p>
                </div>
            </div>

            {/* Countdown */}
            <div className={`text-center py-2 px-4 rounded-lg mb-4 ${statusInfo.color === 'error' ? 'bg-error/10' : statusInfo.color === 'warning' ? 'bg-warning/10' : 'bg-success/10'}`}>
                <p className={`font-mono font-bold ${statusInfo.color === 'error' ? 'text-error' : statusInfo.color === 'warning' ? 'text-warning' : 'text-success'}`}>
                    {formatCountdown(subscription.expiryDate)}
                </p>
            </div>

            {/* Progress Bar */}
            {subscription.expiryDate && (
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Validity Used</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${progressColors[statusInfo.color]} transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Activation Key */}
            <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500">Activation Key</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                            title={showKey ? 'Hide Key' : 'Show Key'}
                        >
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-primary transition-colors p-1"
                            title="Copy Key"
                        >
                            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>
                <p className="font-mono text-sm text-white tracking-wider">
                    {showKey ? subscription.activationKey : '••••-••••-••••-••••••'}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button size="sm" className="flex-1 gap-2">
                    <RefreshCcw size={14} /> Renew
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                    Details <ChevronRight size={14} />
                </Button>
            </div>
        </motion.div>
    );
};

export default SubscriptionCard;
