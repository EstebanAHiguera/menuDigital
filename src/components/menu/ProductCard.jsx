import { useApp } from '../../context/AppContext';
import { fmt } from '../../utils/fmt';

export default function ProductCard({ product }) {
  const { addToCart, cart, removeFromCart } = useApp();
  const qty = cart[product.id] || 0;
  
  if (!product.available) return null;
  
  return (
    <div className={`bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col transition-all
      ${qty > 0 ? 'border-2 border-[#F5C800]' : 'border border-[#2A2A2A]'}`}>      
      <div className="bg-[#2A2A2A] aspect-square flex items-center justify-center text-5xl relative">
        {product.emoji}
        {qty > 0 && (
          <span className="absolute top-2 right-2 bg-[#F5C800] text-[#0D0D0D] text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
            {qty}
          </span>
        )}
      </div>
      
      <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
        {product.badge && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase self-start
            ${product.badge === 'popular' ? 'bg-[#D81B1B] text-white' : 'bg-[#F5C800] text-[#0D0D0D]'}`}>
            {product.badge}
          </span>
        )}
        
        <p className="font-bold text-[13px] text-white leading-tight">{product.name}</p>
        <p className="text-[11px] text-white/40 leading-snug">{product.desc}</p> 
        <span className="font-black text-[12px] text-[#F5C800] mt-1 block]">{fmt(product.price)}</span>
        
        <div className="flex items-center justify-end gap-1 mt-2">
          <button
            onClick={() => qty > 0 && removeFromCart(product.id)}
            className="bg-[#F5C800] text-[#0D0D0D] border-none rounded-lg px-2 py-1 font-black text-xs cursor-pointer active:scale-95 transition-transform"
          >
            -
          </button>
          
          <input
            type="text"
            readOnly
            value={qty}
            className="w-8 h-6 text-center rounded-lg bg-[#2A2A2A] border border-[#4A4A4A] text-white font-black text-xs"
          />
          
          <button
            onClick={() => addToCart(product.id)}
            className="w-6 h-6 rounded-full bg-[#D81B1B] border-none text-white text-sm flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
