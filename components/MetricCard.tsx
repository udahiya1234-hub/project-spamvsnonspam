import React from 'react';

interface MetricCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
    return (
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
                <div className="bg-white shadow-sm p-3 rounded-xl border border-slate-200 group-hover:border-neon-blue/30 transition-colors">
                    {React.isValidElement(icon)
                        ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-neon-blue group-hover:text-neon-purple transition-colors" })
                        : icon}
                </div>
                <span className="text-xs font-bold tracking-wider text-neon-blue uppercase bg-neon-blue/5 px-2 py-1 rounded-full border border-neon-blue/20">
                    Model Stats
                </span>
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium tracking-wide mb-1">{title}</p>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">{value}</p>
            </div>
        </div>
    );
};

export default MetricCard;