import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../ui/Button';

const GiftCardCard = ({ subscription, index }) => {
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(subscription.redemptionCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isRedeemed = subscription.isRedeemed;
    const hasBalance = subscription.balanceRemaining > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border-l-4 ${isRedeemed ? 'border-l-success' : 'border-l-primary'} bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-white/20 transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                        {subscription.productLogo}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">{subscription.productName}</h3>
                        <p className="text-xs text-gray-400">Gift Card</p>
                    </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${isRedeemed ? 'bg-success/20 text-success' : 'bg-blue-500/20 text-blue-400'}`}>
                    {isRedeemed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {isRedeemed ? 'Redeemed' : 'Not Redeemed'}
                </span>
            </div>

            {/* Card Value */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase">Card Value</p>
                    <p className="text-xl font-bold text-white">₹{subscription.cardValue}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase">Balance</p>
                    <p className={`text-xl font-bold ${hasBalance ? 'text-success' : 'text-gray-500'}`}>
                        ₹{subscription.balanceRemaining}
                    </p>
                </div>
            </div>

            {/* Redemption Code - Always Visible */}
            <div className="bg-black/40 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Redemption Code</p>

                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <p className="font-mono text-sm text-white tracking-wider flex-1">
                        {showCode ? subscription.redemptionCode : '••••-••••-••••-••••'}
                    </p>
                    <div className="flex gap-1.5 shrink-0">
                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                        >
                            {showCode ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md hover:bg-white/10"
                        >
                            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                {/* Purchase Date */}
                <div className="flex justify-between text-xs mt-3 pt-3 border-t border-white/5">
                    <span className="text-gray-500">Purchased</span>
                    <span className="text-gray-300">{subscription.purchaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {subscription.redemptionLink && !isRedeemed && (
                    <a href={subscription.redemptionLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="w-full gap-1.5 text-xs">
                            <ExternalLink size={12} /> Redeem Now
                        </Button>
                    </a>
                )}
                {isRedeemed && hasBalance && (
                    <a href={subscription.redemptionLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
                            <ExternalLink size={12} /> Check Balance
                        </Button>
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default GiftCardCard;
