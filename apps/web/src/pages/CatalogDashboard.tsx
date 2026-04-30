import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Box, 
  Share2, 
  CheckCircle2, 
  ShieldCheck,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  Activity,
  Layers,
  Database,
  Cpu
} from 'lucide-react';

const registryGrowthData = [
  { name: 'Jan', count: 120 },
  { name: 'Feb', count: 145 },
  { name: 'Mar', count: 180 },
  { name: 'Apr', count: 210 },
  { name: 'May', count: 245 },
  { name: 'Jun', count: 284 },
];

const KPI_CARDS = [
  { title: 'Registered Services', value: '284', trend: '+15%', color: 'indigo', icon: Box },
  { title: 'Validation Pass Rate', value: '98.2%', trend: 'Healthy', color: 'indigo', icon: CheckCircle2 },
  { title: 'Average Dependencies', value: '4.2', trend: '+0.5', color: 'indigo', icon: Share2 },
  { title: 'Governance Compliance', value: '95%', trend: 'Stable', color: 'slate', icon: ShieldCheck },
];

const CatalogDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Catalog Intelligence</h1>
          <p className="text-slate-400">Strategic oversight of global service specifications and dependencies.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Export Catalog JSON
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Register New Service
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend === 'Healthy' ? 'text-indigo-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registry Growth Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Service Registry Growth (6m)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registryGrowthData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#colorCount)" name="Services" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lifecycle Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Lifecycle Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Active', value: 65, color: 'bg-indigo-500' },
              { name: 'Draft', value: 20, color: 'bg-amber-500' },
              { name: 'Proposed', value: 10, color: 'bg-emerald-500' },
              { name: 'Deprecated', value: 5, color: 'bg-slate-500' },
            ].map((state) => (
              <div key={state.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{state.name}</span>
                  <span className="text-slate-400">{state.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${state.color}`} style={{ width: `${state.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Service Registry Preview</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All Services</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Service Name</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Version</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Lifecycle</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'payment-gateway', owner: 'team-fintech', version: '1.2.0', status: 'HEALTHY', lifecycle: 'ACTIVE' },
                { name: 'auth-service', owner: 'team-iam', version: '0.8.5', status: 'DEGRADED', lifecycle: 'PROPOSED' },
                { name: 'ledger-db-proxy', owner: 'team-data', version: '2.1.0', status: 'HEALTHY', lifecycle: 'ACTIVE' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.owner}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.version}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'HEALTHY' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.lifecycle}</td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CatalogDashboard;
