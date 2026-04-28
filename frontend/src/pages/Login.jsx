import React from 'react'

function Login() {
  return (
    // 1. THE WRAPPER: Full screen, dark slate background, centers the content
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      
      // 2. THE CARD: Dark background, border, and nice rounded corners
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Secure AI-Powered Finance Tracking</p>
        </div>

        {/* The Form - (Practice putting items on top of each other) */}
        <form className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="button" 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-900/20 transition-all active:scale-95"
          >
            Sign In
          </button>

        </form>

        {/* Footer Link */}
        <p className="text-center text-slate-500 mt-6 text-sm">
          Don't have an account? <span className="text-cyan-400 cursor-pointer hover:underline">Register</span>
        </p>
      </div>

    </div>
  )
}

export default Login
