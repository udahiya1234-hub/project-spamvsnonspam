import React from 'react';

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
    return (
        <div className="glass-panel p-8 rounded-2xl h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-neon-blue to-neon-purple rounded-full mr-3"></span>
                {title}
            </h3>
            <div className="prose prose-slate max-w-none flex-grow">
                {children}
            </div>
        </div>
    );
};

export default InfoCard;