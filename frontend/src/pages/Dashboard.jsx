import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const apiUrl = `${import.meta.env.VITE_API_URL}/users/1/expenses/`;
    console.log("Requesting:", apiUrl);

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setAnalysisResult(result);

      if (result.is_anomaly) {
        console.log("Anomaly detected by ML model!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-cyan-400">FiscalGuard Dashboard</h1>
        <button className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30">Logout</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/*  EXPENSE FORM */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl mb-4 font-semibold">Log New Expense</h2>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <input 
              type="number" 
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
            />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg outline-none text-white"
            >
             <option value="Eating_Out">Eating Out</option>
              <option value="Groceries">Groceries</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Utilities">Utilities</option>
            </select>
            <button className="w-full bg-cyan-600 py-3 rounded-lg font-bold hover:bg-cyan-500 transition-all">
              Analyze with AI
            </button>
          </form>
        </div>

        {/* RECENT TRANSACTIONS & AI STATUS */}
        <div className="md:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl mb-4 font-semibold text-cyan-400">Transaction Guard</h2>
          
          {!analysisResult ? (
            <div className="text-slate-500 italic">
              No transactions analyzed yet. Add one to see the ML model in action!
            </div>
          ) : (
            <div className={`p-6 rounded-xl border ${analysisResult.is_anomaly ? 'bg-red-900/20 border-red-500/50' : 'bg-emerald-900/20 border-emerald-500/50'}`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Result for: ₹{analysisResult.amount} ({analysisResult.category})</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${analysisResult.is_anomaly ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                  {analysisResult.is_anomaly ? 'Anomaly' : 'Normal'}
                </span>
              </div>
              
              <p className="text-slate-300">
                {analysisResult.is_anomaly 
                  ? "🚨 This transaction deviates significantly from typical spending patterns. We recommend reviewing this expense."
                  : "✅ This transaction aligns with your normal spending history. No unusual activity detected."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;