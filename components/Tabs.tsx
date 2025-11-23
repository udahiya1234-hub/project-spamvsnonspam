import React, { useState } from 'react';

interface Tab {
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex flex-col space-y-8" id="tour-tabs">
            <div className="flex justify-center">
                <div className="bg-white/50 p-1.5 rounded-full border border-white/40 inline-flex backdrop-blur-md relative shadow-sm">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(index)}
                            className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none ${
                                activeTab === index
                                    ? 'text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab.label}
                            {activeTab === index && (
                                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full -z-10"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards key={activeTab}">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;