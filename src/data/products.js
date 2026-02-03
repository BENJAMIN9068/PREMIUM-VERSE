// Product catalog for Premium-Verse
// Properly categorized products with official logos

// Logo URLs from reliable CDN sources
const LOGOS = {
    // OTT
    youtube: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg',
    netflix: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg',
    primevideo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/primevideo.svg',
    hotstar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hotstar.svg',
    zee5: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Zee5-official-logo.png',
    sonyliv: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Sony_LIV_logo.svg/200px-Sony_LIV_logo.svg.png',
    jiocinema: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/JioCinema_Logo.svg/200px-JioCinema_Logo.svg.png',

    // Music
    spotify: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg',
    youtubemusic: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtubemusic.svg',

    // AI
    chatgpt: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg',
    claude: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/anthropic.svg',
    gemini: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlegemini.svg',
    midjourney: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/midjourney.svg',
    copilot: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/githubcopilot.svg',

    // Software
    microsoft: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg',
    windows: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/windows11.svg',
    office: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftoffice.svg',

    // Adobe
    adobe: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobe.svg',
    photoshop: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobephotoshop.svg',
    premiere: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobepremierepro.svg',
    illustrator: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeillustrator.svg',
    acrobat: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeacrobatreader.svg',

    // Design
    canva: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg',
    figma: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg',
    coreldraw: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coreldraw.svg',

    // Cloud
    googlecloud: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlecloud.svg',
    onedrive: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftonedrive.svg',
    dropbox: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dropbox.svg',

    // VPN
    nordvpn: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nordvpn.svg',
    expressvpn: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/expressvpn.svg',
    surfshark: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/surfshark.svg',
    protonvpn: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/protonvpn.svg',

    // Security
    malwarebytes: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/malwarebytes.svg',
    kaspersky: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/kaspersky.svg',
    norton: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/norton.svg',

    // Gaming
    xbox: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/xbox.svg',
    playstation: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/playstation.svg',
    steam: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/steam.svg',

    // Productivity
    grammarly: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/grammarly.svg',
    notion: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg',

    // Education
    coursera: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coursera.svg',
    linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
    udemy: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/udemy.svg',
    skillshare: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/skillshare.svg',

    // Others
    autodesk: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/autodesk.svg',
    envato: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/envato.svg',
    shutterstock: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shutterstock.svg',
};

export const PRODUCT_CATEGORIES = [
    { id: 'ott', name: 'OTT & Streaming', icon: '🎬', description: 'Netflix, Prime, Hotstar & more', color: 'from-red-500 to-orange-500' },
    { id: 'music', name: 'Music Streaming', icon: '🎵', description: 'Spotify, YouTube Music & more', color: 'from-green-500 to-emerald-500' },
    { id: 'ai_tools', name: 'AI Tools', icon: '🤖', description: 'ChatGPT, Claude, Gemini & more', color: 'from-purple-500 to-pink-500' },
    { id: 'software_keys', name: 'Software & License Keys', icon: '🔑', description: 'Windows, Office, Lifetime Keys', color: 'from-blue-500 to-cyan-500' },
    { id: 'editing', name: 'Editing & Design', icon: '🎨', description: 'Adobe, Canva, Filmora & more', color: 'from-pink-500 to-rose-500' },
    { id: 'cloud', name: 'Cloud Storage', icon: '☁️', description: 'Google One, OneDrive & more', color: 'from-sky-500 to-blue-500' },
    { id: 'vpn', name: 'VPN Services', icon: '🔒', description: 'NordVPN, ExpressVPN & more', color: 'from-indigo-500 to-violet-500' },
    { id: 'antivirus', name: 'Antivirus & Security', icon: '🛡️', description: 'Malwarebytes, Norton & more', color: 'from-yellow-500 to-amber-500' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', description: 'Xbox, PlayStation, Steam', color: 'from-green-500 to-teal-500' },
    { id: 'productivity', name: 'Productivity', icon: '📊', description: 'Grammarly, Notion & more', color: 'from-orange-500 to-red-500' },
    { id: 'education', name: 'Education', icon: '📚', description: 'Coursera, LinkedIn Learning', color: 'from-teal-500 to-cyan-500' },
];

export const PRODUCTS = [
    // ========== OTT & STREAMING ==========
    // YouTube Premium
    { id: 'yt-premium-1m', name: 'YouTube Premium', plan: '1 Month', price: 29, originalPrice: 139, category: 'ott', badge: 'Best Seller', logo: LOGOS.youtube },
    { id: 'yt-premium-3m', name: 'YouTube Premium', plan: '3 Months', price: 79, originalPrice: 417, category: 'ott', logo: LOGOS.youtube },
    { id: 'yt-premium-6m', name: 'YouTube Premium', plan: '6 Months', price: 149, originalPrice: 834, category: 'ott', logo: LOGOS.youtube },
    { id: 'yt-premium-12m', name: 'YouTube Premium', plan: '12 Months', price: 279, originalPrice: 1668, category: 'ott', badge: 'Best Value', logo: LOGOS.youtube },

    // Prime Video
    { id: 'prime-video-1m', name: 'Prime Video (Mobile)', plan: '1 Month', price: 49, originalPrice: 149, category: 'ott', logo: LOGOS.primevideo },
    { id: 'prime-video-3m', name: 'Prime Video (Mobile)', plan: '3 Months', price: 129, originalPrice: 447, category: 'ott', logo: LOGOS.primevideo },

    // Hotstar
    { id: 'hotstar-super', name: 'Hotstar Super (4K)', plan: '1 Year', price: 299, originalPrice: 899, category: 'ott', badge: 'Popular', logo: LOGOS.hotstar },
    { id: 'hotstar-vip', name: 'Hotstar VIP', plan: '1 Year', price: 249, originalPrice: 499, category: 'ott', logo: LOGOS.hotstar },

    // SonyLIV
    { id: 'sonyliv-1m', name: 'SonyLIV', plan: '1 Month', price: 49, originalPrice: 149, category: 'ott', logo: LOGOS.sonyliv },
    { id: 'sonyliv-12m', name: 'SonyLIV Premium', plan: '12 Months', price: 399, originalPrice: 999, category: 'ott', logo: LOGOS.sonyliv },

    // Zee5
    { id: 'zee5-premium', name: 'Zee5 Premium', plan: '1 Year', price: 299, originalPrice: 999, category: 'ott', logo: LOGOS.zee5 },

    // Netflix
    { id: 'netflix-1screen', name: 'Netflix Premium', plan: '1 Screen', price: 99, originalPrice: 199, category: 'ott', badge: 'Hot', logo: LOGOS.netflix },
    { id: 'netflix-4screen', name: 'Netflix Premium', plan: '4 Screens (UHD)', price: 199, originalPrice: 649, category: 'ott', logo: LOGOS.netflix },

    // JioCinema
    { id: 'jiocinema-premium', name: 'JioCinema Premium', plan: '1 Year', price: 299, originalPrice: 999, category: 'ott', logo: LOGOS.jiocinema },

    // ========== MUSIC STREAMING ==========
    { id: 'spotify-1m', name: 'Spotify Premium', plan: '1 Month', price: 49, originalPrice: 119, category: 'music', badge: 'Popular', logo: LOGOS.spotify },
    { id: 'spotify-3m', name: 'Spotify Premium', plan: '3 Months', price: 129, originalPrice: 357, category: 'music', logo: LOGOS.spotify },
    { id: 'spotify-6m', name: 'Spotify Premium', plan: '6 Months', price: 239, originalPrice: 714, category: 'music', logo: LOGOS.spotify },
    { id: 'spotify-12m', name: 'Spotify Premium', plan: '12 Months', price: 449, originalPrice: 1428, category: 'music', badge: 'Best Value', logo: LOGOS.spotify },

    { id: 'ytmusic-1m', name: 'YouTube Music Premium', plan: '1 Month', price: 29, originalPrice: 99, category: 'music', logo: LOGOS.youtubemusic },
    { id: 'ytmusic-3m', name: 'YouTube Music Premium', plan: '3 Months', price: 79, originalPrice: 297, category: 'music', logo: LOGOS.youtubemusic },

    // ========== AI TOOLS ==========
    { id: 'chatgpt-1m', name: 'ChatGPT Plus', plan: '1 Month (Shared)', price: 299, originalPrice: 1650, category: 'ai_tools', badge: 'Hot', logo: LOGOS.chatgpt },
    { id: 'chatgpt-own', name: 'ChatGPT Plus', plan: '1 Month (Own Account)', price: 999, originalPrice: 1650, category: 'ai_tools', logo: LOGOS.chatgpt },
    { id: 'claude-1m', name: 'Claude Pro', plan: '1 Month', price: 499, originalPrice: 1650, category: 'ai_tools', logo: LOGOS.claude },
    { id: 'perplexity-1m', name: 'Perplexity Pro', plan: '1 Month', price: 399, originalPrice: 1650, category: 'ai_tools', logo: LOGOS.chatgpt },
    { id: 'midjourney-1m', name: 'Midjourney', plan: '1 Month', price: 599, originalPrice: 2500, category: 'ai_tools', logo: LOGOS.midjourney },
    { id: 'gemini-1m', name: 'Google Gemini Advanced', plan: '1 Month', price: 399, originalPrice: 1650, category: 'ai_tools', badge: 'New', logo: LOGOS.gemini },
    { id: 'copilot-1m', name: 'Microsoft Copilot Pro', plan: '1 Month', price: 499, originalPrice: 1650, category: 'ai_tools', logo: LOGOS.copilot },

    // ========== SOFTWARE & LICENSE KEYS ==========
    { id: 'office-365-1y', name: 'Office 365', plan: '1 Year (1 Device)', price: 249, originalPrice: 4899, category: 'software_keys', badge: 'Best Seller', logo: LOGOS.office },
    { id: 'office-365-5dev', name: 'Office 365', plan: '1 Year (5 Devices)', price: 399, originalPrice: 6199, category: 'software_keys', logo: LOGOS.office },
    { id: 'office-2021-pro', name: 'Office 2021 Professional Plus', plan: 'Lifetime Key', price: 499, originalPrice: 24999, category: 'software_keys', badge: 'Lifetime', logo: LOGOS.office },
    { id: 'office-2024-home', name: 'Office 2024 Home & Business', plan: 'Lifetime Key', price: 599, originalPrice: 25999, category: 'software_keys', badge: 'New', logo: LOGOS.office },
    { id: 'office-2019-pro', name: 'Office 2019 Professional', plan: 'Lifetime Key', price: 349, originalPrice: 24999, category: 'software_keys', logo: LOGOS.office },
    { id: 'win10-pro', name: 'Windows 10 Pro', plan: 'Lifetime Key', price: 299, originalPrice: 14999, category: 'software_keys', logo: LOGOS.windows },
    { id: 'win11-pro', name: 'Windows 11 Pro', plan: 'Lifetime Key', price: 399, originalPrice: 14999, category: 'software_keys', badge: 'Popular', logo: LOGOS.windows },
    { id: 'win11-home', name: 'Windows 11 Home', plan: 'Lifetime Key', price: 299, originalPrice: 9999, category: 'software_keys', logo: LOGOS.windows },
    { id: 'project-2021', name: 'Microsoft Project 2021', plan: 'Lifetime Key', price: 399, originalPrice: 19999, category: 'software_keys', logo: LOGOS.microsoft },
    { id: 'visio-2021', name: 'Microsoft Visio 2021', plan: 'Lifetime Key', price: 349, originalPrice: 19999, category: 'software_keys', logo: LOGOS.microsoft },

    // ========== EDITING & DESIGN ==========
    { id: 'adobe-acrobat', name: 'Adobe Acrobat Pro 2024', plan: 'Lifetime', price: 499, originalPrice: 23999, category: 'editing', logo: LOGOS.acrobat },
    { id: 'adobe-cc', name: 'Adobe Creative Cloud', plan: '1 Year', price: 999, originalPrice: 54000, category: 'editing', badge: 'Pro', logo: LOGOS.adobe },
    { id: 'adobe-photoshop', name: 'Adobe Photoshop', plan: '1 Year', price: 599, originalPrice: 26880, category: 'editing', logo: LOGOS.photoshop },
    { id: 'adobe-premiere', name: 'Adobe Premiere Pro', plan: '1 Year', price: 699, originalPrice: 26880, category: 'editing', logo: LOGOS.premiere },
    { id: 'adobe-illustrator', name: 'Adobe Illustrator', plan: '1 Year', price: 599, originalPrice: 26880, category: 'editing', logo: LOGOS.illustrator },
    { id: 'canva-1m', name: 'Canva Pro', plan: '1 Month', price: 99, originalPrice: 499, category: 'editing', badge: 'Popular', logo: LOGOS.canva },
    { id: 'canva-3m', name: 'Canva Pro', plan: '3 Months', price: 249, originalPrice: 1497, category: 'editing', logo: LOGOS.canva },
    { id: 'canva-12m', name: 'Canva Pro', plan: '12 Months', price: 799, originalPrice: 5988, category: 'editing', badge: 'Best Value', logo: LOGOS.canva },
    { id: 'coreldraw-lifetime', name: 'CorelDRAW Suite 2024', plan: 'Lifetime', price: 599, originalPrice: 54999, category: 'editing', logo: LOGOS.coreldraw },
    { id: 'autodesk-1y', name: 'Autodesk All Apps', plan: '1 Year', price: 999, originalPrice: 99999, category: 'editing', badge: 'Pro', logo: LOGOS.autodesk },

    // ========== CLOUD STORAGE ==========
    { id: 'google-one-100gb', name: 'Google One', plan: '100GB - 1 Year', price: 299, originalPrice: 1300, category: 'cloud', logo: LOGOS.googlecloud },
    { id: 'google-one-200gb', name: 'Google One', plan: '200GB - 1 Year', price: 499, originalPrice: 2100, category: 'cloud', logo: LOGOS.googlecloud },
    { id: 'google-one-2tb', name: 'Google One', plan: '2TB - 1 Year', price: 999, originalPrice: 6500, category: 'cloud', badge: 'Popular', logo: LOGOS.googlecloud },
    { id: 'onedrive-1tb', name: 'OneDrive', plan: '1TB - 1 Year', price: 399, originalPrice: 4199, category: 'cloud', logo: LOGOS.onedrive },
    { id: 'dropbox-plus', name: 'Dropbox Plus', plan: '2TB - 1 Year', price: 799, originalPrice: 9999, category: 'cloud', logo: LOGOS.dropbox },

    // ========== VPN SERVICES ==========
    { id: 'nordvpn-1m', name: 'NordVPN', plan: '1 Month', price: 99, originalPrice: 799, category: 'vpn', logo: LOGOS.nordvpn },
    { id: 'nordvpn-12m', name: 'NordVPN', plan: '12 Months', price: 499, originalPrice: 4699, category: 'vpn', badge: 'Best Value', logo: LOGOS.nordvpn },
    { id: 'expressvpn-1m', name: 'ExpressVPN', plan: '1 Month', price: 149, originalPrice: 999, category: 'vpn', logo: LOGOS.expressvpn },
    { id: 'surfshark-12m', name: 'Surfshark VPN', plan: '12 Months', price: 399, originalPrice: 2999, category: 'vpn', logo: LOGOS.surfshark },
    { id: 'protonvpn-12m', name: 'ProtonVPN Plus', plan: '12 Months', price: 599, originalPrice: 4800, category: 'vpn', logo: LOGOS.protonvpn },

    // ========== ANTIVIRUS & SECURITY ==========
    { id: 'malwarebytes-12m', name: 'Malwarebytes Premium', plan: '12 Months', price: 199, originalPrice: 1299, category: 'antivirus', logo: LOGOS.malwarebytes },
    { id: 'kaspersky-1y', name: 'Kaspersky Total Security', plan: '1 Year', price: 299, originalPrice: 2499, category: 'antivirus', logo: LOGOS.kaspersky },
    { id: 'norton-360', name: 'Norton 360 Deluxe', plan: '1 Year', price: 349, originalPrice: 3999, category: 'antivirus', badge: 'Popular', logo: LOGOS.norton },

    // ========== GAMING ==========
    { id: 'xbox-gamepass-1m', name: 'Xbox Game Pass Ultimate', plan: '1 Month', price: 199, originalPrice: 699, category: 'gaming', badge: 'Hot', logo: LOGOS.xbox },
    { id: 'xbox-gamepass-3m', name: 'Xbox Game Pass Ultimate', plan: '3 Months', price: 499, originalPrice: 2097, category: 'gaming', logo: LOGOS.xbox },
    { id: 'psplus-1m', name: 'PlayStation Plus Essential', plan: '1 Month', price: 149, originalPrice: 499, category: 'gaming', logo: LOGOS.playstation },
    { id: 'psplus-12m', name: 'PlayStation Plus Essential', plan: '12 Months', price: 999, originalPrice: 2999, category: 'gaming', logo: LOGOS.playstation },
    { id: 'steam-wallet-500', name: 'Steam Wallet', plan: '₹500 Code', price: 475, originalPrice: 500, category: 'gaming', logo: LOGOS.steam },
    { id: 'steam-wallet-1k', name: 'Steam Wallet', plan: '₹1000 Code', price: 950, originalPrice: 1000, category: 'gaming', logo: LOGOS.steam },

    // ========== PRODUCTIVITY ==========
    { id: 'grammarly-1m', name: 'Grammarly Premium', plan: '1 Month', price: 199, originalPrice: 999, category: 'productivity', logo: LOGOS.grammarly },
    { id: 'grammarly-12m', name: 'Grammarly Premium', plan: '12 Months', price: 999, originalPrice: 11988, category: 'productivity', badge: 'Best Value', logo: LOGOS.grammarly },
    { id: 'notion-1m', name: 'Notion Plus', plan: '1 Month', price: 99, originalPrice: 850, category: 'productivity', logo: LOGOS.notion },
    { id: 'envato-1m', name: 'Envato Elements', plan: '1 Month', price: 199, originalPrice: 1399, category: 'productivity', logo: LOGOS.envato },
    { id: 'shutterstock-10', name: 'Shutterstock', plan: '10 Images', price: 99, originalPrice: 2499, category: 'productivity', logo: LOGOS.shutterstock },

    // ========== EDUCATION ==========
    { id: 'coursera-1m', name: 'Coursera Plus', plan: '1 Month', price: 299, originalPrice: 4000, category: 'education', logo: LOGOS.coursera },
    { id: 'coursera-12m', name: 'Coursera Plus', plan: '12 Months', price: 1999, originalPrice: 35000, category: 'education', badge: 'Best Value', logo: LOGOS.coursera },
    { id: 'linkedin-1m', name: 'LinkedIn Learning', plan: '1 Month', price: 199, originalPrice: 1999, category: 'education', logo: LOGOS.linkedin },
    { id: 'skillshare-12m', name: 'Skillshare Premium', plan: '12 Months', price: 499, originalPrice: 8400, category: 'education', logo: LOGOS.skillshare },
    { id: 'udemy-business', name: 'Udemy Business', plan: '1 Month', price: 149, originalPrice: 999, category: 'education', logo: LOGOS.udemy },
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

export const getCategoryById = (id) => {
    return PRODUCT_CATEGORIES.find(c => c.id === id);
};

export { LOGOS };
