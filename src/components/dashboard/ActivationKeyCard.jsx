import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, RefreshCcw, ExternalLink, Download } from 'lucide-react';
import { getSubscriptionStatus, getProgressPercentage, formatCountdown } from '../../data/mockUserData';
import Button from '../ui/Button';

const ActivationKeyCard = ({ subscription, index }) => {
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
        success: 'border-l-success',
        warning: 'border-l-warning',
        error: 'border-l-error',
    };

    const badgeColors = {
        success: 'bg-success/20 text-success',
        warning: 'bg-warning/20 text-warning',
        error: 'bg-error/20 text-error',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border-l-4 ${statusColors[statusInfo.color]} bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-white/20 transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                        {subscription.productLogo}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">{subscription.productName}</h3>
                        <p className="text-xs text-gray-400">{subscription.planType}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColors[statusInfo.color]} ${statusInfo.pulse ? 'animate-pulse' : ''}`}>
                        {statusInfo.isLifetime ? '∞ Lifetime' : statusInfo.label}
                    </span>
                </div>
            </div>

            {/* Dates - Only show for non-lifetime */}
            {!statusInfo.isLifetime && (
                <>
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        <div>
                            <p className="text-gray-500">Purchased</p>
                            <p className="text-gray-300">{subscription.purchaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Expires</p>
                            <p className={`font-medium ${statusInfo.isExpired ? 'text-error' : statusInfo.color === 'warning' ? 'text-warning' : 'text-success'}`}>
                                {subscription.expiryDate?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || 'Never'}
                            </p>
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className={`text-center py-2 px-3 rounded-lg mb-4 ${statusInfo.isExpired ? 'bg-error/10' : statusInfo.color === 'warning' ? 'bg-warning/10' : 'bg-success/10'}`}>
                        <p className={`font-mono text-sm font-bold ${statusInfo.isExpired ? 'text-error' : statusInfo.color === 'warning' ? 'text-warning' : 'text-success'}`}>
                            {formatCountdown(subscription.expiryDate)}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Validity</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${statusInfo.isExpired ? 'bg-error' : statusInfo.color === 'warning' ? 'bg-warning' : 'bg-success'}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Lifetime Purchased Date */}
            {statusInfo.isLifetime && (
                <div className="mb-4 text-xs">
                    <p className="text-gray-500">Purchased</p>
                    <p className="text-gray-300">{subscription.purchaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
            )}

            {/* Activation Key - Always Visible */}
            <div className="bg-black/40 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Activation Key</p>
                    {statusInfo.isExpired && (
                        <span className="text-[10px] text-warning bg-warning/10 px-2 py-0.5 rounded-full">Key still valid</span>
                    )}
                </div>

                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <p className="font-mono text-sm text-white tracking-wider flex-1">
                        {showKey ? subscription.activationKey : '••••-••••-••••-••••'}
                    </p>
                    <div className="flex gap-1.5 shrink-0">
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                        >
                            {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md hover:bg-white/10"
                        >
                            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                {subscription.activationEmail && (
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Activation Email</span>
                        <span className="text-gray-300">{subscription.activationEmail}</span>
                    </div>
                )}
                {subscription.systemRequirements && (
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Requirements</span>
                        <span className="text-gray-300">{subscription.systemRequirements}</span>
                    </div>
                )}
                {subscription.deviceLimit && (
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Devices</span>
                        <span className="text-gray-300">{subscription.devicesUsed} of {subscription.deviceLimit} used</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {subscription.activationLink && (
                    <a href={subscription.activationLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="w-full gap-1.5 text-xs">
                            <ExternalLink size={12} /> Activate
                        </Button>
                    </a>
                )}
                {!statusInfo.isLifetime && statusInfo.isExpired && (
                    <Button size="sm" className="flex-1 gap-1.5 text-xs">
                        <RefreshCcw size={12} /> Renew
                    </Button>
                )}
                <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                    <Download size={12} /> Invoice
                </Button>
            </div>
        </motion.div>
    );
};

export default ActivationKeyCard;
