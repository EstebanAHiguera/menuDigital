import { useCart } from '../context/CartContext';

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

function Badge({ type }) {
  if (!type) return null;
  const styles = {
    popular: 'bg-[#D81B1B] text-white',
    nuevo:   'bg-[#F5C800] text-[#0D0D0D]',
  };
  const labels = { popular: 'Popular', nuevo: 'Nuevo' };
  return (
    <span className={`${styles[type]} text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide self-start`}>
      {labels[type]}
    </span>
  );
}

export function ProductCard({ product }) {
  const { addItem, removeItem , cart } = useCart();
  const qty = cart[product.id] || 0;

  return (
    <div className={`bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col transition-all
      ${qty > 0 ? 'border-2 border-[#F5C800]' : 'border border-[#2A2A2A]'}`}
    >
      {/* Imagen */}
      <div className="bg-[#2A2A2A] aspect-square flex items-center justify-center text-5xl relative">
        {product.emoji}
        {qty > 0 && (
          <span className="absolute top-2 right-2 bg-[#F5C800] text-[#0D0D0D] text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
            {qty}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
        <div>
          <Badge type={product.badge} />
          <p className="font-bold text-[13px] text-white leading-tight">{product.name}</p>
          <p className="text-[11px] text-white/40 leading-snug">{product.desc}</p>
          <span className="font-black text-[15px] text-[#F5C800] mt-2 block">{fmt(product.price)}</span>
        </div>

        <div className="flex items-center justify-end gap-2 mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => qty > 0 && removeItem(product.id)}
              className="bg-[#F5C800] text-[#0D0D0D] border-none rounded-xl px-3 py-1.5 font-black text-sm cursor-pointer active:scale-95 transition-transform"
            >
              -
            </button>
            <input
              type="text"
              readOnly
              value={qty}
              className="w-12 h-8 text-center rounded-xl bg-[#2A2A2A] border border-[#4A4A4A] text-white font-black"
            />
            <button
              onClick={() => addItem(product.id)}
              className="w-8 h-8 rounded-full bg-[#D81B1B] border-none text-white text-xl flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComboCard({ combo }) {
  const { addItem, removeItem, cart } = useCart();
  const save = combo.originalPrice - combo.price;
  const qty = cart[combo.id] || 0;

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-3.5 flex items-center gap-3 mb-2.5">
      <div className="text-4xl w-16 h-16 bg-[#2A2A2A] rounded-2xl flex items-center justify-center flex-shrink-0">
        {combo.emoji}
      </div>
      <div className="flex-1 flex flex-col">
        <p className="font-black text-sm text-white">{combo.name}</p>
        <p className="text-[12px] text-white/40 mt-0.5">{combo.desc}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-black text-base text-[#F5C800]">{fmt(combo.price)}</span>
            <span className="text-[11px] bg-[#D81B1B] text-white px-2 py-0.5 rounded-lg font-bold">
              -{fmt(save)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => qty > 0 && removeItem(combo.id)}
              className="bg-[#F5C800] text-[#0D0D0D] border-none rounded-xl px-3 py-1.5 font-black text-sm cursor-pointer active:scale-95 transition-transform"
            >
              -
            </button>
            <input
              type="text"
              readOnly
              value={qty}
              className="w-12 h-8 text-center rounded-xl bg-[#2A2A2A] border border-[#4A4A4A] text-white font-black"
            />
            <button
              onClick={() => addItem(combo.id)}
              className="w-8 h-8 rounded-full bg-[#D81B1B] border-none text-white text-xl flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BebidaRow({ bebida }) {
  const { addItem, removeItem, cart } = useCart();
  const qty = cart[bebida.id] || 0;

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-3.5 flex items-center gap-3 mb-2.5 ">
      <div className="text-xl w-10 h-10 bg-[#2A2A2A] rounded-xl flex items-center justify-center flex-shrink-0">
        {bebida.emoji}
      </div>
      <p className="flex-1 font-semibold text-[13px] text-white">{bebida.name}</p>
      <div className="flex items-center gap-2">
        <span className="font-black text-[13px] text-[#F5C800]">{fmt(bebida.price)}</span>
        <button
          onClick={() => qty > 0 && removeItem(bebida.id)}
          className="bg-[#F5C800] text-[#0D0D0D] border-none rounded-xl px-3 py-1.5 font-black text-sm cursor-pointer active:scale-95 transition-transform"
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={qty}
          className="w-12 h-8 text-center rounded-xl bg-[#2A2A2A] border border-[#4A4A4A] text-white font-black"
        />
        <button
          onClick={() => addItem(bebida.id)}
          className="w-8 h-8 rounded-full bg-[#D81B1B] border-none text-white text-lg flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
        >
          +
        </button>
      </div>
    </div>
  );
}