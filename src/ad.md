import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import NavPills from './components/NavPills';
import MenuSection from './components/MenuSection';
import MapSection from './components/MapSection';
import CartSheet from './components/CartSheet';
import BottomNav from './components/BottomNav';

function AppContent() {
  const [activeTab, setActiveTab] = useState('garullas');
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-amber-100  min-h-dvh">
      <Header onCartOpen={() => setCartOpen(true)} />

      {activeTab !== 'ubicacion' && (
        <NavPills active={activeTab} onChange={setActiveTab} />
      )}

      {activeTab === 'ubicacion'
        ? <MapSection />
        : <MenuSection activeTab={activeTab} />
      }

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCartOpen={() => setCartOpen(true)}
      />

      <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}