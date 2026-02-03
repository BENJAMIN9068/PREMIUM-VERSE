import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, XCircle, X } from 'lucide-react';
import Button from '../ui/Button';

const ExpiryAlert = ({ type = 'warning', count, onDismiss }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const config = {
        warning: {
            icon: AlertTriangle,
            bg: 'bg-warning/10 border-warning/30',
            text: 'text-warning',
            message: `⚠️ You have ${count} subscription${count > 1 ? 's' : ''} expiring soon! Renew now to continue premium access.`,
            buttonText: 'View Expiring',
        },
        expired: {
            icon: XCircle,
            bg: 'bg-error/10 border-error/30',
            text: 'text-error',
            message: `❌ ${count} subscription${count > 1 ? 's have' : ' has'} expired. Renew now to regain access.`,
            buttonText: 'Renew Now',
        },
    };

    const { icon: Icon, bg, text, message, buttonText } = config[type];

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`${bg} border rounded-xl p-4 flex items-center gap-4 mb-6`}
                >
                    <Icon className={text} size={24} />
                    <p className={`${text} text-sm flex-1`}>{message}</p>
                    <Button size="sm" variant={type === 'expired' ? 'default' : 'outline'} className="shrink-0">
                        {buttonText}
                    </Button>
                    <button
                        onClick={handleDismiss}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExpiryAlert;
