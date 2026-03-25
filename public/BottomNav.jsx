import { useCart } from '../context/CartContext';

export default function BottomNav({ activeTab, onTabChange, onCartOpen }) {
  const { totalItems } = useCart();

  const isMenu = ['garullas', 'almojabanas', 'combos', 'bebidas'].includes(activeTab);
  const isMap  = activeTab === 'ubicacion';

  const base = 'flex-1 flex flex-col items-center justify-center py-2 gap-1 text-[10px] font-bold bg-transparent border-none cursor-pointer transition-all';
  const active = 'text-[#F5C800]';
  const inactive = 'text-white/30';

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#0D0D0D] border-t-2 border-[#F5C800] flex z-[150]">

      <button className={`${base} ${isMenu ? active : inactive}`} onClick={() => onTabChange('garullas')}>
        <span className="text-xl">🍞</span>
        Menú
      </button>

      <button className={`${base} ${inactive} relative`} onClick={onCartOpen}>
        <span className="text-xl relative inline-block">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#D81B1B] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </span>
        Carrito
      </button>

      <button className={`${base} ${isMap ? active : inactive}`} onClick={() => onTabChange('ubicacion')}>
        <span className="text-xl">📍</span>
        Ubicación
      </button>

    </nav>
  );
}