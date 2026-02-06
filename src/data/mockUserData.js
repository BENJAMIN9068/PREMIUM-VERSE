// Deprecated Mock Data
// All real data is now handled by ProductStore, OrdersStore, LeadsStore, etc.

export const CATEGORIES = [
    { id: 'ott', name: 'Streaming Services', icon: '🎬' },
    { id: 'music', name: 'Music Streaming', icon: '🎵' },
    { id: 'ai_tools', name: 'AI Tools', icon: '🤖' },
    { id: 'software_keys', name: 'Software Keys', icon: '🔑' },
    { id: 'editing', name: 'Editing Tools', icon: '✨' },
    { id: 'cloud', name: 'Cloud Storage', icon: '☁️' },
    { id: 'vpn', name: 'VPN Services', icon: '🔒' },
    { id: 'antivirus', name: 'Antivirus', icon: '🛡️' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'productivity', name: 'Productivity', icon: '📊' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'other', name: 'Other', icon: '📦' }
];

// Empty exports to prevent import errors until all references are removed
export const MOCK_SUBSCRIPTIONS = [];
export const MOCK_ORDERS = [];
export const calculateStats = () => ({
    activeCount: 0,
    expiringCount: 0,
    totalOrders: 0,
    totalSpent: 0
});
export const getSubscriptionStatus = () => ({ isExpired: false });
export const getSubscriptionsByCategory = () => ({});
