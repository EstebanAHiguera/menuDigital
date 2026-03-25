import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AdminSidebar from './components/admin/AdminSidebar';
import Dashboard from './components/admin/Dashboard';
import OrdersPanel from './components/admin/OrdersPanel';
import ProductsPanel from './components/admin/ProductsPanel';
import HistoryPanel from './components/admin/HistoryPanel';
import PublicMenu from './components/menu/PublicMenu';

function AdminLayout({ onGoMenu }) {
  const [activePanel, setActivePanel] = useState('dashboard');

  const handleNav = (id) => {
    if (id === 'menu') { onGoMenu(); return; }
    setActivePanel(id);
  };

  return (
    <div className="flex min-h-dvh bg-[#0D0D0D]">
      <AdminSidebar active={activePanel} onChange={handleNav} />
      <main className="flex-1 overflow-auto">
        {activePanel === 'dashboard' && <Dashboard onNavigate={setActivePanel} />}
        {activePanel === 'orders'    && <OrdersPanel />}
        {activePanel === 'products'  && <ProductsPanel />}
        {activePanel === 'history'   && <HistoryPanel />}
      </main>
    </div>
  );
}

function AppContent() {
  const [view, setView] = useState('menu');

  return view === 'admin'
    ? <AdminLayout onGoMenu={() => setView('menu')} />
    : <PublicMenu onAdmin={() => setView('admin')} />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}