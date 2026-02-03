import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, RefreshCcw, HelpCircle, Lock } from 'lucide-react';
import { getSubscriptionStatus, getProgressPercentage, formatCountdown, shouldShowCredentials } from '../../data/mockUserData';
import Button from '../ui/Button';

const AccountSharingCard = ({ subscription, index }) => {
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const statusInfo = getSubscriptionStatus(subscription);
    const progress = getProgressPercentage(subscription);
    const canShowCredentials = shouldShowCredentials(subscription);

    // Auto-hide credentials after 30 seconds
    useEffect(() => {
        let timer;
        if (showEmail || showPassword) {
            timer = setTimeout(() => {
                setShowEmail(false);
                setShowPassword(false);
            }, 30000);
        }
        return () => clearTimeout(timer);
    }, [showEmail, showPassword]);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
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
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColors[statusInfo.color]} ${statusInfo.pulse ? 'animate-pulse' : ''}`}>
                    {statusInfo.label}
                </span>
            </div>

            {/* Dates */}
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
            {subscription.expiryDate && (
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
            )}

            {/* Credentials Section */}
            {canShowCredentials ? (
                <div className="bg-black/40 rounded-xl p-4 mb-4 space-y-3">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Credentials</p>

                    {/* Email */}
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-2.5">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500 uppercase">Email/Username</p>
                            <p className="font-mono text-xs text-white truncate">
                                {showEmail ? subscription.accountEmail : '••••••••@••••••.com'}
                            </p>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                            <button
                                onClick={() => setShowEmail(!showEmail)}
                                className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                            >
                                {showEmail ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button
                                onClick={() => handleCopy(subscription.accountEmail, 'email')}
                                className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md hover:bg-white/10"
                            >
                                {copiedField === 'email' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-2.5">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500 uppercase">Password</p>
                            <p className="font-mono text-xs text-white">
                                {showPassword ? subscription.accountPassword : '••••••••••••'}
                            </p>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                            >
                                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button
                                onClick={() => handleCopy(subscription.accountPassword, 'password')}
                                className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md hover:bg-white/10"
                            >
                                {copiedField === 'password' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>

                    {/* Extra Info */}
                    {subscription.profileName && (
                        <div className="flex justify-between text-xs pt-2 border-t border-white/5">
                            <span className="text-gray-500">Profile</span>
                            <span className="text-gray-300">{subscription.profileName}</span>
                        </div>
                    )}
                    {subscription.screens && (
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Screens</span>
                            <span className="text-gray-300">{subscription.screens}</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-error/10 border border-error/20 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Lock className="text-error" size={18} />
                        <p className="text-error font-medium text-sm">Credentials Hidden</p>
                    </div>
                    <p className="text-xs text-gray-400">
                        This subscription has expired. Account credentials are no longer accessible.
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <Button size="sm" className="flex-1 gap-1.5 text-xs">
                    <RefreshCcw size={12} /> Renew
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                    <HelpCircle size={12} /> Support
                </Button>
            </div>
        </motion.div>
    );
};

export default AccountSharingCard;
