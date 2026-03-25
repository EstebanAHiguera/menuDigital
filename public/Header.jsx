import { useCart } from '../context/CartContext';

export default function Header({ onCartOpen }) {
  const { totalItems } = useCart();

  return (
    <header className="bg-amber-100 border-b-4 border-[#F5C800] sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div>
        <h1 className="font-display text-amber-900 text-4xl tracking-widest leading-none">
          LA GARULLA
        </h1>
        <p className="text-amber-900 text-[10px] tracking-[3px] uppercase mt-1">
          Panadería & Pastelería
        </p>
      </div>

      {/* Estado + carrito */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#1A1A1A] rounded-full px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-white/70 text-xs font-semibold">Abierto</span>
        </div>

        <button
          onClick={onCartOpen}
          className="relative bg-[#D81B1B] rounded-xl w-11 h-11 flex items-center justify-center text-xl cursor-pointer border-none active:scale-95 transition-transform"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#F5C800] text-[#0D0D0D] text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}