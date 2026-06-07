

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Eating_Out'); 
  const [analysisResult, setAnalysisResult] = useState(null);

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${baseURL}/users/1/expenses/`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchHistory();
    }
  }, [isLoggedIn]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const apiUrl = `${baseURL}/users/1/expenses/`;

    const expenseData = {
      amount: parseFloat(amount),
      category: category,
      description: "Manual entry"
    };


    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
        setAmount('');
        fetchHistory(); // Refresh history immediately
      }
    } catch (error) {
      console.error("Error logging expense:", error);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setExpenses([]);
    setAmount('');
    setAnalysisResult(null);
  };
  
  // --- MATH LOGIC ---
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Added safe check (item.timestamp && ...) to prevent crashes on null dates
  const dailyTotal = expenses
    .filter(item => item.timestamp && item.timestamp.startsWith(today))
    .reduce((sum, item) => sum + item.amount, 0);

  const monthlyTotal = expenses
    .filter(item => item.timestamp && item.timestamp.startsWith(currentMonth))
    .reduce((sum, item) => sum + item.amount, 0);

  // Added safe check here as well to fix the white screen crash
  const todaysExpenses = expenses.filter(item => item.timestamp && item.timestamp.startsWith(today));

  const chartData = Object.values(
    todaysExpenses.reduce((acc, item) => {
      let unifiedCategory = item.category;
      if (item.category === "Food" || item.category === "FOOD") {
        unifiedCategory = "Eating_Out";
      }

      if (!acc[unifiedCategory]) {
        acc[unifiedCategory] = { name: unifiedCategory, value: 0 };
      }
      acc[unifiedCategory].value += item.amount;
      return acc;
    }, {})
  );

  const COLORS = ['#22d3ee', '#818cf8', '#f472b6', '#fbbf24', '#34d399', '#f87171'];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 bg-slate-900/50 border border-slate-800 p-10 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="h-16 w-16 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-2xl font-black text-slate-950">FG</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            FiscalGuard
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            An intelligent financial monitoring application powered by machine learning anomaly detection pipelines.
          </p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold hover:from-cyan-500 hover:to-indigo-500 shadow-xl shadow-cyan-950/30 transition-all transform active:scale-98"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-cyan-400">FiscalGuard Dashboard</h1>
        {/* FIXED: Hooked up onClick event trigger */}
        <button 
          onClick={handleLogout}
          className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 border-l-4 border-l-cyan-500">
          <p className="text-slate-400 text-xs uppercase font-bold">Today's Total</p>
          <h3 className="text-3xl font-bold mt-1">₹{dailyTotal.toLocaleString()}</h3>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 border-l-4 border-l-purple-500">
          <p className="text-slate-400 text-xs uppercase font-bold">This Month</p>
          <h3 className="text-3xl font-bold mt-1">₹{monthlyTotal.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-8">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <h2 className="text-xl mb-4 font-semibold">Log New Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-bold ml-1">Amount</label>
                <input 
                  type="number" 
                  placeholder="₹ 0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-bold ml-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                >
                  <option value="Eating_Out">Eating Out</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Rent">Rent</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Transport">Transport</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>
              <button className="w-full bg-cyan-600 py-3 rounded-xl font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all transform active:scale-95">
                Analyze with AI
              </button>
            </form>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <h2 className="text-xl mb-4 font-semibold text-cyan-400">AI Guard Result</h2>
            {!analysisResult ? (
              <p className="text-slate-500 italic text-sm text-center py-4">Waiting for next transaction...</p>
            ) : (
              <div className={`p-4 rounded-xl border ${analysisResult.is_anomaly ? 'bg-red-900/20 border-red-500' : 'bg-emerald-900/20 border-emerald-500'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg">₹{analysisResult.amount}</span>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${analysisResult.is_anomaly ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    {analysisResult.is_anomaly ? 'Anomaly' : 'Normal'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {analysisResult.is_anomaly 
                    ? "🚨 This expense is statistically higher than your average for this category."
                    : "✅ This entry aligns with your historical spending patterns."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg min-h-[400px]">
          <h2 className="text-xl mb-4 font-semibold text-cyan-400 text-center">Category Breakdown</h2>
          {expenses.length === 0 ? (
             <div className="h-full flex items-center justify-center text-slate-500 italic">No data to chart</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h2 className="text-xl mb-4 font-semibold text-slate-400">Transaction History</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {expenses.length === 0 ? (
              <p className="text-slate-500 italic text-center py-10">Your history is currently empty.</p>
            ) : (
              expenses.slice().reverse().map((exp) => (
                <div key={exp.id} className="flex justify-between items-center bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <div>
                    <div className="font-bold text-lg text-white">₹{exp.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">{exp.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500">{new Date(exp.timestamp).toLocaleDateString()}</div>
                    {exp.is_anomaly && <div className="text-[9px] text-red-400 font-bold">ML FLAGGED</div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;