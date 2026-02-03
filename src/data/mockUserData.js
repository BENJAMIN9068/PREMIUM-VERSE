// Categories configuration and mock data for user dashboard
// In production, this data would come from the database

export const CATEGORIES = [
    { id: 'ott', name: 'OTT Platforms & Streaming', icon: '🎬', badge: 'Account Sharing', credentialType: 'account' },
    { id: 'ai_tools', name: 'AI Tools & Software', icon: '🤖', badge: 'Activation Keys', credentialType: 'key' },
    { id: 'software', name: 'Software Licenses & Keys', icon: '💻', badge: 'Activation Keys', credentialType: 'key' },
    { id: 'antivirus', name: 'Antivirus & Security', icon: '🛡️', badge: 'Activation Keys', credentialType: 'key' },
    { id: 'vpn', name: 'VPN Services', icon: '🔒', badge: 'Account Credentials', credentialType: 'account' },
    { id: 'gaming', name: 'Gaming Subscriptions', icon: '🎮', badge: 'Mixed', credentialType: 'mixed' },
    { id: 'music', name: 'Music Streaming', icon: '🎵', badge: 'Account Sharing', credentialType: 'account' },
    { id: 'cloud', name: 'Cloud Storage', icon: '☁️', badge: 'Account Credentials', credentialType: 'account' },
    { id: 'productivity', name: 'Productivity Tools', icon: '📊', badge: 'Activation Keys', credentialType: 'key' },
    { id: 'gift_cards', name: 'Gift Cards & Vouchers', icon: '🎁', badge: 'Redemption Codes', credentialType: 'gift' },
];

// Mock subscriptions with categories and credential types
export const MOCK_SUBSCRIPTIONS = [
    // OTT Platforms
    {
        id: 'sub_001',
        category: 'ott',
        credentialType: 'account',
        productName: 'Netflix Premium',
        productLogo: '🎬',
        planType: '1 Year Premium',
        purchaseDate: new Date('2026-01-15T10:15:00'),
        activationDate: new Date('2026-01-15T10:20:00'),
        expiryDate: new Date('2027-01-15T23:59:59'),
        accountEmail: 'netflix.shared@premiumverse.com',
        accountPassword: 'Nflx@2026Secure',
        profileName: 'Profile 2',
        screens: '1 of 4',
        pricePaid: 499,
    },
    {
        id: 'sub_002',
        category: 'ott',
        credentialType: 'account',
        productName: 'Amazon Prime Video',
        productLogo: '📺',
        planType: '1 Year',
        purchaseDate: new Date('2025-01-10T14:30:00'),
        activationDate: new Date('2025-01-10T14:35:00'),
        expiryDate: new Date('2026-01-10T23:59:59'), // Expired
        accountEmail: 'prime.user@premiumverse.com',
        accountPassword: 'Prime@Secure2025',
        profileName: 'User 1',
        screens: '1 of 3',
        pricePaid: 399,
    },
    {
        id: 'sub_003',
        category: 'ott',
        credentialType: 'account',
        productName: 'Disney+ Hotstar',
        productLogo: '⭐',
        planType: 'Super',
        purchaseDate: new Date('2026-01-28T09:00:00'),
        activationDate: new Date('2026-01-28T09:05:00'),
        expiryDate: new Date('2026-02-10T23:59:59'), // Expiring soon
        accountEmail: 'hotstar.shared@premiumverse.com',
        accountPassword: 'Hotstar@2026',
        profileName: 'Profile 1',
        screens: '2 of 2',
        pricePaid: 299,
    },

    // AI Tools
    {
        id: 'sub_004',
        category: 'ai_tools',
        credentialType: 'key',
        productName: 'ChatGPT Plus',
        productLogo: '🤖',
        planType: '1 Month',
        purchaseDate: new Date('2026-01-05T09:30:00'),
        activationDate: new Date('2026-01-05T09:35:00'),
        expiryDate: new Date('2026-02-05T23:59:59'),
        activationKey: 'GPT-PLUS-2026-XYZ789',
        activationEmail: 'user@email.com',
        activationLink: 'https://chat.openai.com/redeem',
        pricePaid: 399,
    },
    {
        id: 'sub_005',
        category: 'ai_tools',
        credentialType: 'key',
        productName: 'Midjourney Pro',
        productLogo: '🎨',
        planType: '1 Month',
        purchaseDate: new Date('2025-12-15T11:00:00'),
        activationDate: new Date('2025-12-15T11:05:00'),
        expiryDate: new Date('2026-01-15T23:59:59'), // Expired but key visible
        activationKey: 'MJ-PRO-2025-ABC123',
        activationEmail: 'user@email.com',
        activationLink: 'https://midjourney.com/account',
        pricePaid: 899,
    },

    // Software
    {
        id: 'sub_006',
        category: 'software',
        credentialType: 'key',
        productName: 'Windows 11 Pro',
        productLogo: '💻',
        planType: 'Lifetime',
        purchaseDate: new Date('2025-12-01T06:20:00'),
        activationDate: new Date('2025-12-01T06:25:00'),
        expiryDate: null, // Lifetime
        activationKey: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
        systemRequirements: 'Windows 10/11, 64-bit',
        pricePaid: 599,
    },
    {
        id: 'sub_007',
        category: 'software',
        credentialType: 'key',
        productName: 'Microsoft Office 2021',
        productLogo: '📊',
        planType: 'Lifetime',
        purchaseDate: new Date('2025-11-20T10:00:00'),
        activationDate: new Date('2025-11-20T10:05:00'),
        expiryDate: null,
        activationKey: 'NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP',
        systemRequirements: 'Windows 10/11 or macOS',
        pricePaid: 799,
    },

    // Antivirus
    {
        id: 'sub_008',
        category: 'antivirus',
        credentialType: 'key',
        productName: 'Norton 360',
        productLogo: '🛡️',
        planType: '1 Year',
        purchaseDate: new Date('2026-01-10T08:10:00'),
        activationDate: new Date('2026-01-10T08:15:00'),
        expiryDate: new Date('2027-01-10T23:59:59'),
        activationKey: 'NORT-360-2026-JKL012',
        deviceLimit: 3,
        devicesUsed: 2,
        pricePaid: 399,
    },

    // VPN
    {
        id: 'sub_009',
        category: 'vpn',
        credentialType: 'account',
        productName: 'NordVPN',
        productLogo: '🔒',
        planType: '2 Years',
        purchaseDate: new Date('2025-10-01T11:30:00'),
        activationDate: new Date('2025-10-01T11:35:00'),
        expiryDate: new Date('2027-10-01T23:59:59'),
        accountEmail: 'nordvpn.user@premiumverse.com',
        accountPassword: 'NordVPN@Secure2025',
        serverLocations: 'Worldwide (60+ countries)',
        simultaneousDevices: 6,
        pricePaid: 699,
    },

    // Music
    {
        id: 'sub_010',
        category: 'music',
        credentialType: 'account',
        productName: 'Spotify Premium',
        productLogo: '🎵',
        planType: '6 Months',
        purchaseDate: new Date('2025-12-20T12:15:00'),
        activationDate: new Date('2025-12-20T12:20:00'),
        expiryDate: new Date('2026-06-20T23:59:59'),
        accountEmail: 'spotify.shared@premiumverse.com',
        accountPassword: 'Spotify@Prem2025',
        pricePaid: 349,
    },

    // Cloud Storage
    {
        id: 'sub_011',
        category: 'cloud',
        credentialType: 'account',
        productName: 'Google One',
        productLogo: '☁️',
        planType: '100 GB - 1 Year',
        purchaseDate: new Date('2026-01-01T10:00:00'),
        activationDate: new Date('2026-01-01T10:05:00'),
        expiryDate: new Date('2027-01-01T23:59:59'),
        accountEmail: 'cloudstorage@premiumverse.com',
        accountPassword: 'Cloud@Secure2026',
        storageCapacity: '100 GB',
        pricePaid: 499,
    },

    // Gift Cards
    {
        id: 'sub_012',
        category: 'gift_cards',
        credentialType: 'gift',
        productName: 'Amazon Gift Card',
        productLogo: '🎁',
        cardValue: 1000,
        redemptionCode: 'AMZN-GIFT-2026-WXYZ',
        redemptionLink: 'https://www.amazon.in/gc/redeem',
        isRedeemed: false,
        balanceRemaining: 1000,
        purchaseDate: new Date('2026-01-25T14:00:00'),
        pricePaid: 1000,
    },
    {
        id: 'sub_013',
        category: 'gift_cards',
        credentialType: 'gift',
        productName: 'Google Play Gift Card',
        productLogo: '🎮',
        cardValue: 500,
        redemptionCode: 'GPLAY-2026-ABCD1234',
        redemptionLink: 'https://play.google.com/redeem',
        isRedeemed: true,
        balanceRemaining: 150,
        purchaseDate: new Date('2026-01-10T09:00:00'),
        pricePaid: 500,
    },
];

export const MOCK_ORDERS = [
    {
        id: 'ord_001',
        orderId: '#ORD-2026-001234',
        productName: 'Netflix Premium (1 Year)',
        category: 'ott',
        productImage: '🎬',
        amount: 499,
        orderStatus: 'completed',
        paymentMethod: 'UPI',
        paymentStatus: 'paid',
        transactionId: 'TXN123456789',
        createdAt: new Date('2026-01-15T10:15:00'),
        deliveredAt: new Date('2026-01-15T10:20:00'),
    },
    {
        id: 'ord_002',
        orderId: '#ORD-2026-001235',
        productName: 'ChatGPT Plus (1 Month)',
        category: 'ai_tools',
        productImage: '🤖',
        amount: 399,
        orderStatus: 'completed',
        paymentMethod: 'Card',
        paymentStatus: 'paid',
        transactionId: 'TXN987654321',
        createdAt: new Date('2026-01-05T09:30:00'),
        deliveredAt: new Date('2026-01-05T09:35:00'),
    },
    {
        id: 'ord_003',
        orderId: '#ORD-2025-005679',
        productName: 'Windows 11 Pro (Lifetime)',
        category: 'software',
        productImage: '💻',
        amount: 599,
        orderStatus: 'completed',
        paymentMethod: 'UPI',
        paymentStatus: 'paid',
        transactionId: 'TXN321654987',
        createdAt: new Date('2025-12-01T06:20:00'),
        deliveredAt: new Date('2025-12-01T06:25:00'),
    },
    {
        id: 'ord_004',
        orderId: '#ORD-2026-001236',
        productName: 'NordVPN (2 Years)',
        category: 'vpn',
        productImage: '🔒',
        amount: 699,
        orderStatus: 'completed',
        paymentMethod: 'Net Banking',
        paymentStatus: 'paid',
        transactionId: 'TXN456789123',
        createdAt: new Date('2025-10-01T11:30:00'),
        deliveredAt: new Date('2025-10-01T11:35:00'),
    },
    {
        id: 'ord_005',
        orderId: '#ORD-2026-001237',
        productName: 'Amazon Gift Card ₹1000',
        category: 'gift_cards',
        productImage: '🎁',
        amount: 1000,
        orderStatus: 'completed',
        paymentMethod: 'UPI',
        paymentStatus: 'paid',
        transactionId: 'TXN789123456',
        createdAt: new Date('2026-01-25T14:00:00'),
        deliveredAt: new Date('2026-01-25T14:05:00'),
    },
];

// Helper Functions
export const getSubscriptionStatus = (subscription) => {
    if (!subscription.expiryDate) return { status: 'active', label: 'Lifetime', color: 'success', isLifetime: true };

    const now = new Date();
    const expiry = new Date(subscription.expiryDate);
    const daysLeft = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return { status: 'expired', label: 'Expired', color: 'error', daysLeft: Math.abs(daysLeft), isExpired: true };
    if (daysLeft <= 7) return { status: 'expiring_soon', label: 'Expiring Soon', color: 'warning', daysLeft, pulse: true };
    if (daysLeft <= 30) return { status: 'expiring', label: 'Active', color: 'warning', daysLeft };
    return { status: 'active', label: 'Active', color: 'success', daysLeft };
};

export const shouldShowCredentials = (subscription) => {
    const status = getSubscriptionStatus(subscription);
    const category = CATEGORIES.find(c => c.id === subscription.category);

    // Account-based credentials (OTT, VPN, Music, Cloud) - hide when expired
    if (category?.credentialType === 'account') {
        return !status.isExpired;
    }

    // Activation keys and gift cards - always visible
    return true;
};

export const getProgressPercentage = (subscription) => {
    if (!subscription.expiryDate) return 0;
    const start = new Date(subscription.activationDate || subscription.purchaseDate);
    const end = new Date(subscription.expiryDate);
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
};

export const formatCountdown = (expiryDate) => {
    if (!expiryDate) return '∞ Lifetime';
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;

    if (diff < 0) {
        const daysPast = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
        return `Expired ${daysPast} days ago`;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 30) return `${days} days remaining`;
    return `${days}d : ${hours}h : ${minutes}m`;
};

export const getSubscriptionsByCategory = (subscriptions) => {
    const grouped = {};
    CATEGORIES.forEach(cat => {
        grouped[cat.id] = subscriptions.filter(s => s.category === cat.id);
    });
    return grouped;
};

export const calculateStats = (subscriptions, orders) => {
    const now = new Date();
    let activeCount = 0;
    let expiringCount = 0;

    subscriptions.forEach(sub => {
        const status = getSubscriptionStatus(sub);
        if (!status.isExpired) activeCount++;
        if (status.status === 'expiring_soon') expiringCount++;
    });

    const totalSpent = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.amount, 0);

    return {
        activeCount,
        expiringCount,
        totalOrders: orders.length,
        totalSpent,
    };
};
