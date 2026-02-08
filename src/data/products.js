// Product catalog for Premium-Verse
// Properly categorized products with official logos

// Logo URLs from reliable CDN sources
const LOGOS = {
    // OTT
    youtube: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg',
    netflix: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg',
    primevideo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/primevideo.svg',
    hotstar: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hotstar.svg',
    zee5: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zee5.svg',
    sonyliv: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sony.svg',
    jiocinema: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jio.svg',

    // Music
    spotify: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg',
    youtubemusic: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtubemusic.svg',

    // AI
    chatgpt: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',
    claude: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg',
    gemini: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg',
    midjourney: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg',
    copilot: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg',
    perplexity: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/perplexity.svg',

    // Software
    microsoft: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg',
    windows: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/windows11.svg',
    office: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftoffice.svg',

    // Adobe
    adobe: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg',
    photoshop: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobephotoshop.svg',
    premiere: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobepremierepro.svg',
    illustrator: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeillustrator.svg',
    acrobat: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeacrobatreader.svg',

    // Design
    canva: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/canva.svg',
    figma: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg',
    coreldraw: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/coreldraw.svg',

    // Cloud
    googlecloud: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg',
    onedrive: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftonedrive.svg',
    dropbox: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dropbox.svg',

    // VPN
    nordvpn: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nordvpn.svg',
    expressvpn: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/expressvpn.svg',
    surfshark: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/surfshark.svg',
    protonvpn: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/protonvpn.svg',

    // Security
    malwarebytes: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/malwarebytes.svg',
    kaspersky: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kaspersky.svg',
    norton: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/norton.svg',

    // Gaming
    xbox: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/xbox.svg',
    playstation: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/playstation.svg',
    steam: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/steam.svg',

    // Productivity
    grammarly: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/grammarly.svg',
    notion: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg',

    // Education
    coursera: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/coursera.svg',
    linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg',
    udemy: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/udemy.svg',
    skillshare: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/skillshare.svg',

    // Others
    autodesk: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/autodesk.svg',
    envato: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/envato.svg',
    shutterstock: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shutterstock.svg',
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

export const PRODUCTS = [];

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
