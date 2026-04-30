import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import CatalogDashboard from './pages/CatalogDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The service catalog spec engine is currently indexing global metadata and mapping dependency graphs. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<CatalogDashboard />} />
          <Route path="/registry" element={<Placeholder name="Service Registry Explorer" />} />
          <Route path="/dependencies" element={<Placeholder name="Dependency Graph Viewer" />} />
          <Route path="/validation" element={<Placeholder name="Spec Validation Dashboard" />} />
          <Route path="/governance" element={<Placeholder name="Platform Governance Hub" />} />
          <Route path="/docs" element={<Placeholder name="Auto-generated API Docs" />} />
          <Route path="/audit" element={<Placeholder name="Catalog Audit Logs" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
