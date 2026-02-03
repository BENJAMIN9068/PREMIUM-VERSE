// Product catalog for Premium-Verse
// All products listed from user's requirements

export const PRODUCT_CATEGORIES = [
    { id: 'ott', name: 'OTT & Streaming', icon: '🎬', description: 'Netflix, Prime, Hotstar & more' },
    { id: 'music', name: 'Music Streaming', icon: '🎵', description: 'Spotify, YouTube Music & more' },
    { id: 'software', name: 'Software & OS', icon: '💻', description: 'Windows, Office, Adobe & more' },
    { id: 'ai_tools', name: 'AI Tools', icon: '🤖', description: 'ChatGPT, Midjourney & more' },
    { id: 'vpn', name: 'VPN Services', icon: '🔒', description: 'NordVPN, ExpressVPN & more' },
    { id: 'antivirus', name: 'Antivirus & Security', icon: '🛡️', description: 'Norton, Kaspersky & more' },
    { id: 'cloud', name: 'Cloud Storage', icon: '☁️', description: 'Google One, Dropbox & more' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', description: 'Xbox, PlayStation & more' },
    { id: 'productivity', name: 'Productivity', icon: '📊', description: 'Canva, Grammarly & more' },
    { id: 'education', name: 'Education', icon: '📚', description: 'Coursera, LinkedIn Learning & more' },
];

export const PRODUCTS = [
    // ========== OTT & STREAMING ==========
    // YouTube Premium
    { id: 'yt-premium-1m', name: 'YouTube Premium', plan: '1 Month', price: 29, originalPrice: 139, category: 'ott', badge: 'Best Seller', image: '🎬' },
    { id: 'yt-premium-3m', name: 'YouTube Premium', plan: '3 Months', price: 79, originalPrice: 417, category: 'ott', image: '🎬' },
    { id: 'yt-premium-6m', name: 'YouTube Premium', plan: '6 Months', price: 149, originalPrice: 834, category: 'ott', image: '🎬' },
    { id: 'yt-premium-12m', name: 'YouTube Premium', plan: '12 Months', price: 279, originalPrice: 1668, category: 'ott', badge: 'Best Value', image: '🎬' },

    // Prime Video
    { id: 'prime-video-1m', name: 'Prime Video (Mobile)', plan: '1 Month', price: 49, originalPrice: 149, category: 'ott', image: '📺' },
    { id: 'prime-video-3m', name: 'Prime Video (Mobile)', plan: '3 Months', price: 129, originalPrice: 447, category: 'ott', image: '📺' },

    // Hotstar
    { id: 'hotstar-super', name: 'Hotstar Super (4K)', plan: '1 Year', price: 299, originalPrice: 899, category: 'ott', badge: 'Popular', image: '⭐' },
    { id: 'hotstar-vip', name: 'Hotstar VIP', plan: '1 Year', price: 249, originalPrice: 499, category: 'ott', image: '⭐' },

    // SonyLIV
    { id: 'sonyliv-1m', name: 'SonyLIV', plan: '1 Month', price: 49, originalPrice: 149, category: 'ott', image: '📺' },
    { id: 'sonyliv-12m', name: 'SonyLIV Premium', plan: '12 Months', price: 399, originalPrice: 999, category: 'ott', image: '📺' },

    // Zee5
    { id: 'zee5-premium', name: 'Zee5 Premium', plan: '1 Year', price: 299, originalPrice: 999, category: 'ott', image: '📺' },

    // Netflix
    { id: 'netflix-1screen', name: 'Netflix Premium', plan: '1 Screen', price: 99, originalPrice: 199, category: 'ott', badge: 'Hot', image: '🎬' },
    { id: 'netflix-4screen', name: 'Netflix Premium', plan: '4 Screens (UHD)', price: 199, originalPrice: 649, category: 'ott', image: '🎬' },

    // JioCinema
    { id: 'jiocinema-premium', name: 'JioCinema Premium', plan: '1 Year', price: 299, originalPrice: 999, category: 'ott', image: '📺' },

    // Lionsgate Play
    { id: 'lionsgate-12m', name: 'Lionsgate Play', plan: '12 Months', price: 199, originalPrice: 699, category: 'ott', image: '🎥' },

    // Kuku FM
    { id: 'kukufm-12m', name: 'Kuku FM Premium', plan: '12 Months', price: 149, originalPrice: 599, category: 'ott', image: '🎧' },

    // Ullu
    { id: 'ullu-6m', name: 'Ullu Premium', plan: '6 Months', price: 149, originalPrice: 499, category: 'ott', image: '📺' },
    { id: 'ullu-12m', name: 'Ullu Premium', plan: '12 Months', price: 249, originalPrice: 799, category: 'ott', image: '📺' },

    // ========== MUSIC STREAMING ==========
    { id: 'spotify-1m', name: 'Spotify Premium', plan: '1 Month', price: 49, originalPrice: 119, category: 'music', badge: 'Popular', image: '🎵' },
    { id: 'spotify-3m', name: 'Spotify Premium', plan: '3 Months', price: 129, originalPrice: 357, category: 'music', image: '🎵' },
    { id: 'spotify-6m', name: 'Spotify Premium', plan: '6 Months', price: 239, originalPrice: 714, category: 'music', image: '🎵' },
    { id: 'spotify-12m', name: 'Spotify Premium', plan: '12 Months', price: 449, originalPrice: 1428, category: 'music', badge: 'Best Value', image: '🎵' },

    { id: 'ytmusic-1m', name: 'YouTube Music Premium', plan: '1 Month', price: 29, originalPrice: 99, category: 'music', image: '🎵' },
    { id: 'ytmusic-3m', name: 'YouTube Music Premium', plan: '3 Months', price: 79, originalPrice: 297, category: 'music', image: '🎵' },

    // ========== SOFTWARE & OS ==========
    // Microsoft Office
    { id: 'office-365-1y', name: 'Office 365', plan: '1 Year (1 Device)', price: 249, originalPrice: 4899, category: 'software', badge: 'Best Seller', image: '📊' },
    { id: 'office-365-5dev', name: 'Office 365', plan: '1 Year (5 Devices)', price: 399, originalPrice: 6199, category: 'software', image: '📊' },
    { id: 'office-2021-pro', name: 'Office 2021 Professional Plus', plan: 'Lifetime', price: 499, originalPrice: 24999, category: 'software', badge: 'Lifetime', image: '📊' },
    { id: 'office-2024-home', name: 'Office 2024 Home & Business', plan: 'Lifetime', price: 599, originalPrice: 25999, category: 'software', badge: 'New', image: '📊' },
    { id: 'office-2019-pro', name: 'Office 2019 Professional', plan: 'Lifetime', price: 349, originalPrice: 24999, category: 'software', image: '📊' },

    // Windows
    { id: 'win10-pro', name: 'Windows 10 Pro', plan: 'Lifetime', price: 299, originalPrice: 14999, category: 'software', image: '💻' },
    { id: 'win11-pro', name: 'Windows 11 Pro', plan: 'Lifetime', price: 399, originalPrice: 14999, category: 'software', badge: 'Popular', image: '💻' },
    { id: 'win11-home', name: 'Windows 11 Home', plan: 'Lifetime', price: 299, originalPrice: 9999, category: 'software', image: '💻' },

    // Project & Visio
    { id: 'project-2021', name: 'Microsoft Project 2021', plan: 'Lifetime', price: 399, originalPrice: 19999, category: 'software', image: '📋' },
    { id: 'visio-2021', name: 'Microsoft Visio 2021', plan: 'Lifetime', price: 349, originalPrice: 19999, category: 'software', image: '📐' },

    // ========== ADOBE ==========
    { id: 'adobe-acrobat', name: 'Adobe Acrobat Pro 2024', plan: 'Lifetime', price: 499, originalPrice: 23999, category: 'software', image: '📄' },
    { id: 'adobe-cc', name: 'Adobe Creative Cloud', plan: '1 Year', price: 999, originalPrice: 54000, category: 'software', badge: 'Pro', image: '🎨' },
    { id: 'adobe-photoshop', name: 'Adobe Photoshop', plan: '1 Year', price: 599, originalPrice: 26880, category: 'software', image: '🎨' },

    // ========== AI TOOLS ==========
    { id: 'chatgpt-1m', name: 'ChatGPT Plus', plan: '1 Month (Shared)', price: 299, originalPrice: 1650, category: 'ai_tools', badge: 'Hot', image: '🤖' },
    { id: 'chatgpt-own', name: 'ChatGPT Plus', plan: '1 Month (Own Account)', price: 999, originalPrice: 1650, category: 'ai_tools', image: '🤖' },
    { id: 'claude-1m', name: 'Claude Pro', plan: '1 Month', price: 499, originalPrice: 1650, category: 'ai_tools', image: '🤖' },
    { id: 'perplexity-1m', name: 'Perplexity Pro', plan: '1 Month', price: 399, originalPrice: 1650, category: 'ai_tools', image: '🔍' },
    { id: 'midjourney-1m', name: 'Midjourney', plan: '1 Month', price: 599, originalPrice: 2500, category: 'ai_tools', image: '🎨' },
    { id: 'gemini-1m', name: 'Google Gemini Advanced', plan: '1 Month', price: 399, originalPrice: 1650, category: 'ai_tools', badge: 'New', image: '✨' },
    { id: 'copilot-1m', name: 'Microsoft Copilot Pro', plan: '1 Month', price: 499, originalPrice: 1650, category: 'ai_tools', image: '🤖' },
    { id: 'poe-1m', name: 'Poe Premium', plan: '1 Month', price: 299, originalPrice: 1650, category: 'ai_tools', image: '💬' },

    // ========== PRODUCTIVITY ==========
    { id: 'canva-1m', name: 'Canva Pro', plan: '1 Month', price: 99, originalPrice: 499, category: 'productivity', badge: 'Popular', image: '🎨' },
    { id: 'canva-3m', name: 'Canva Pro', plan: '3 Months', price: 249, originalPrice: 1497, category: 'productivity', image: '🎨' },
    { id: 'canva-12m', name: 'Canva Pro', plan: '12 Months', price: 799, originalPrice: 5988, category: 'productivity', badge: 'Best Value', image: '🎨' },

    { id: 'grammarly-1m', name: 'Grammarly Premium', plan: '1 Month', price: 199, originalPrice: 999, category: 'productivity', image: '✍️' },
    { id: 'grammarly-12m', name: 'Grammarly Premium', plan: '12 Months', price: 999, originalPrice: 11988, category: 'productivity', image: '✍️' },

    { id: 'notion-1m', name: 'Notion Plus', plan: '1 Month', price: 99, originalPrice: 850, category: 'productivity', image: '📝' },

    { id: 'filmora-lifetime', name: 'Wondershare Filmora', plan: 'Lifetime', price: 499, originalPrice: 5999, category: 'productivity', image: '🎬' },

    // ========== VPN SERVICES ==========
    { id: 'nordvpn-1m', name: 'NordVPN', plan: '1 Month', price: 99, originalPrice: 799, category: 'vpn', image: '🔒' },
    { id: 'nordvpn-12m', name: 'NordVPN', plan: '12 Months', price: 499, originalPrice: 4699, category: 'vpn', badge: 'Best Value', image: '🔒' },
    { id: 'expressvpn-1m', name: 'ExpressVPN', plan: '1 Month', price: 149, originalPrice: 999, category: 'vpn', image: '🔒' },
    { id: 'surfshark-12m', name: 'Surfshark VPN', plan: '12 Months', price: 399, originalPrice: 2999, category: 'vpn', image: '🦈' },

    // ========== ANTIVIRUS ==========
    { id: 'malwarebytes-12m', name: 'Malwarebytes Premium', plan: '12 Months', price: 199, originalPrice: 1299, category: 'antivirus', image: '🛡️' },
    { id: 'iobit-lifetime', name: 'IObit Malware Fighter Pro', plan: 'Lifetime', price: 149, originalPrice: 1999, category: 'antivirus', image: '🛡️' },

    // ========== CLOUD STORAGE ==========
    { id: 'google-one-100gb', name: 'Google One', plan: '100GB - 1 Year', price: 299, originalPrice: 1300, category: 'cloud', image: '☁️' },
    { id: 'google-one-200gb', name: 'Google One', plan: '200GB - 1 Year', price: 499, originalPrice: 2100, category: 'cloud', image: '☁️' },
    { id: 'google-one-2tb', name: 'Google One', plan: '2TB - 1 Year', price: 999, originalPrice: 6500, category: 'cloud', badge: 'Popular', image: '☁️' },
    { id: 'onedrive-1tb', name: 'OneDrive', plan: '1TB - 1 Year', price: 399, originalPrice: 4199, category: 'cloud', image: '☁️' },

    // ========== GAMING ==========
    { id: 'xbox-gamepass-1m', name: 'Xbox Game Pass Ultimate', plan: '1 Month', price: 199, originalPrice: 699, category: 'gaming', badge: 'Hot', image: '🎮' },
    { id: 'xbox-gamepass-3m', name: 'Xbox Game Pass Ultimate', plan: '3 Months', price: 499, originalPrice: 2097, category: 'gaming', image: '🎮' },
    { id: 'psplus-1m', name: 'PlayStation Plus Essential', plan: '1 Month', price: 149, originalPrice: 499, category: 'gaming', image: '🎮' },
    { id: 'steam-wallet', name: 'Steam Wallet', plan: '₹500 Code', price: 475, originalPrice: 500, category: 'gaming', image: '🎮' },

    // ========== EDUCATION ==========
    { id: 'coursera-1m', name: 'Coursera Plus', plan: '1 Month', price: 299, originalPrice: 4000, category: 'education', image: '📚' },
    { id: 'linkedin-1m', name: 'LinkedIn Learning', plan: '1 Month', price: 199, originalPrice: 1999, category: 'education', image: '💼' },
    { id: 'skillshare-12m', name: 'Skillshare Premium', plan: '12 Months', price: 499, originalPrice: 8400, category: 'education', badge: 'Best Value', image: '🎓' },
    { id: 'udemy-business', name: 'Udemy Business', plan: '1 Month', price: 149, originalPrice: 999, category: 'education', image: '📚' },

    // ========== ADDITIONAL SOFTWARE ==========
    { id: 'autodesk-1y', name: 'Autodesk All Apps', plan: '1 Year', price: 999, originalPrice: 99999, category: 'software', badge: 'Pro', image: '🏗️' },
    { id: 'coreldraw-lifetime', name: 'CorelDRAW Suite 2024', plan: 'Lifetime', price: 599, originalPrice: 54999, category: 'software', image: '🎨' },
    { id: 'vegas-pro', name: 'Vegas Pro 21', plan: 'Lifetime', price: 499, originalPrice: 39999, category: 'software', image: '🎬' },

    // ========== MORE SERVICES ==========
    { id: 'elevenlabs-1m', name: 'ElevenLabs', plan: '1 Month', price: 399, originalPrice: 1650, category: 'ai_tools', image: '🔊' },
    { id: 'quillbot-1m', name: 'QuillBot Premium', plan: '1 Month', price: 99, originalPrice: 749, category: 'productivity', image: '✍️' },
    { id: 'envato-1m', name: 'Envato Elements', plan: '1 Month', price: 199, originalPrice: 1399, category: 'productivity', image: '📦' },
    { id: 'shutterstock-10', name: 'Shutterstock', plan: '10 Images', price: 99, originalPrice: 2499, category: 'productivity', image: '📷' },
];

// Helper functions
export const getProductsByCategory = (categoryId) => {
    return PRODUCTS.filter(p => p.category === categoryId);
};

export const getDiscountPercentage = (product) => {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};

export const getFeaturedProducts = () => {
    return PRODUCTS.filter(p => p.badge).slice(0, 12);
};

export const searchProducts = (query) => {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.plan.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
};
