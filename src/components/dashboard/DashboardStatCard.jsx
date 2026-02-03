import { motion } from 'framer-motion';

const DashboardStatCard = ({ title, value, subtext, icon: Icon, color = 'primary', delay = 0 }) => {
    const colorClasses = {
        primary: 'text-primary bg-primary/10',
        success: 'text-success bg-success/10',
        warning: 'text-warning bg-warning/10',
        error: 'text-error bg-error/10',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} transition-colors`}>
                    <Icon size={24} />
                </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
            <p className={`text-3xl font-bold mb-1 ${color === 'primary' ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary' : 'text-white'}`}>
                {value}
            </p>
            <p className="text-xs text-gray-500">{subtext}</p>
        </motion.div>
    );
};

export default DashboardStatCard;
