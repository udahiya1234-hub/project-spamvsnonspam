import React from 'react';

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
    return (
        <div className="relative group p-[1px] rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="glass-panel relative h-full p-8 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(14,165,233,0.08)] flex flex-col transition-all duration-500">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-neon-blue to-neon-purple rounded-full mr-3 shadow-[0_0_10px_rgba(14,165,233,0.4)]"></span>
                    {title}
                </h3>
                <div className="prose prose-slate max-w-none flex-grow">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;