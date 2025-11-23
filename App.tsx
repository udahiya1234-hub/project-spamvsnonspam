import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen relative bg-slate-50 selection:bg-neon-blue selection:text-white overflow-x-hidden">
      
      {/* Creative Animated Background - "Living Watercolor" */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Light Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
        
        {/* Moving Pastel Blobs - mix-blend-multiply creates the watercolor effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-70">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" style={{ animationDelay: '4s' }}></div>
            <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-emerald-300 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" style={{ animationDelay: '6s' }}></div>
        </div>

        {/* Tech Grid Overlay - Subtle Gray */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Radial Highlight - Brightens the center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;