import { useCart } from '../context/CartContext';

const WHATSAPP = '573100000000';
const DELIVERY = 3000;

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

export default function CartSheet({ isOpen, onClose }) {
  const { cartLines, totalPrice, totalItems, addItem, removeItem, clearCart } = useCart();

  const sendWhatsApp = () => {
    if (!cartLines.length) return;
    let msg = '🍞 *Pedido - La Garulla*\n\n';
    cartLines.forEach(item => {
      msg += `• ${item.name} x${item.qty} — ${fmt(item.subtotal)}\n`;
    });
    msg += `\n*Total (sin domicilio):* ${fmt(totalPrice)}\n\n¡Hola! Quiero hacer este pedido 😊`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 z-[200]"
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#1A1A1A] rounded-t-3xl z-[201] max-h-[85dvh] overflow-y-auto pb-8">

        {/* Handle */}
        <div className="w-9 h-1 bg-[#2A2A2A] rounded mx-auto mt-3" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
          <h2 className="font-display text-[#F5C800] text-2xl tracking-widest">Mi Pedido</h2>
          {cartLines.length > 0 && (
            <button
              onClick={clearCart}
              className="text-white/30 text-xs bg-transparent border-none cursor-pointer font-semibold"
            >
              Vaciar
            </button>
          )}
        </div>

        {/* Vacío */}
        {cartLines.length === 0 && (
          <div className="text-center py-12 px-4 text-white/30">
            <p className="text-4xl mb-2">🛒</p>
            <p className="text-sm">Tu carrito está vacío</p>
            <p className="text-xs mt-1">Agrega productos del menú</p>
          </div>
        )}

        {/* Items */}
        {cartLines.map(item => (
          <div key={item.id} className="flex items-center gap-2.5 px-4 py-3 border-b border-[#2A2A2A]">
            <div className="text-3xl w-12 h-12 bg-[#2A2A2A] rounded-xl flex items-center justify-center flex-shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-[13px] text-white">{item.name}</p>
              <p className="text-[13px] font-black text-[#F5C800] mt-0.5">{fmt(item.subtotal)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="w-7 h-7 rounded-full border border-[#2A2A2A] bg-[#2A2A2A] text-white text-base flex items-center justify-center cursor-pointer"
              >−</button>
              <span className="text-sm font-black text-white min-w-[14px] text-center">{item.qty}</span>
              <button
                onClick={() => addItem(item.id)}
                className="w-7 h-7 rounded-full bg-[#D81B1B] border-none text-white text-base flex items-center justify-center cursor-pointer"
              >+</button>
            </div>
          </div>
        ))}

        {/* Totales */}
        {cartLines.length > 0 && (
          <div className="px-4 pt-3">
            <div className="flex justify-between py-1 text-[13px] text-white/50">
              <span>Subtotal ({totalItems} items)</span>
              <span>{fmt(totalPrice)}</span>
            </div>
            <div className="flex justify-between py-1 text-[13px] text-white/50">
              <span>Domicilio estimado</span>
              <span>{fmt(DELIVERY)}</span>
            </div>
            <div className="flex justify-between pt-3 mt-1 border-t border-[#2A2A2A] text-base font-black text-white">
              <span>Total</span>
              <span className="text-[#F5C800]">{fmt(totalPrice + DELIVERY)}</span>
            </div>

            <button
              onClick={sendWhatsApp}
              className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 border-none cursor-pointer mt-4 active:scale-95 transition-transform"
            >
              <span className="text-xl">💬</span> Pedir por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}