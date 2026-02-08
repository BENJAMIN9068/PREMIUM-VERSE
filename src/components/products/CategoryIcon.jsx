import {
    Clapperboard,
    Music,
    Bot,
    Key,
    Palette,
    Cloud,
    Lock,
    ShieldCheck,
    Gamepad2,
    BarChart3,
    GraduationCap,
    LayoutGrid
} from 'lucide-react';

const CategoryIcon = ({ id, className = "w-6 h-6" }) => {
    switch (id) {
        case 'ott': return <Clapperboard className={className} />;
        case 'music': return <Music className={className} />;
        case 'ai_tools': return <Bot className={className} />;
        case 'software_keys': return <Key className={className} />;
        case 'editing': return <Palette className={className} />;
        case 'cloud': return <Cloud className={className} />;
        case 'vpn': return <Lock className={className} />;
        case 'antivirus': return <ShieldCheck className={className} />;
        case 'gaming': return <Gamepad2 className={className} />;
        case 'productivity': return <BarChart3 className={className} />;
        case 'education': return <GraduationCap className={className} />;
        default: return <LayoutGrid className={className} />;
    }
};

export default CategoryIcon;
