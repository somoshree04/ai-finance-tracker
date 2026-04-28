import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900">AI-Finance</h1>
        <div className="space-x-4">
          {/* Use Link instead of <a href> to keep React from refreshing */}
          <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium">Sign in</Link>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium">Sign up</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-20">
        <div>
          <h2 className="text-6xl font-extrabold text-slate-900 leading-tight">
            Save money, <br/> 
            <span className="text-blue-600">without thinking</span> about it.
          </h2>
          <p className="text-slate-500 mt-6 text-lg max-w-md">
            Our AI analyzes your spending patterns and detects anomalies before they become problems.
          </p>
          <Link to="/login">
             <button className="mt-10 bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transition-all">
               SIGN UP NOW
             </button>
          </Link>
        </div>

        {/* --- ILLUSTRATION SPACE --- */}
        <div className="flex justify-center">
          {/* For now, just a styled box. Later we can add an image or lottie animation */}
          <div className="w-full h-96 bg-blue-50 rounded-3xl border-2 border-dashed border-blue-200 flex items-center justify-center">
            <span className="text-blue-400 font-medium">[Finance Illustration Here]</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
