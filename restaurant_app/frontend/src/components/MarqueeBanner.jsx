import { Flame } from 'lucide-react';

const MarqueeBanner = () => {
    const items = [
        "NEW ORLEANS IN MADRID",
        "HAPPY HOUR 5-7 PM",
        "NEW ORLEANS IN MADRID",
        "HAPPY HOUR 5-7 PM",
        "NEW ORLEANS IN MADRID",
        "HAPPY HOUR 5-7 PM",
        "NEW ORLEANS IN MADRID",
        "HAPPY HOUR 5-7 PM"
    ];

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {items.map((item, i) => (
                    <span key={i} className="marquee-item">
                        {item} <Flame className="marquee-sep" fill="currentColor" />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeBanner;
