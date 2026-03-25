import { products, combos, bebidas } from '../Data/Products';
import { ProductCard, ComboCard, BebidaRow } from './ProductCard';

function SectionHeader({ title }) {
  return (
    <div className="mb-4">
      <h2 className=" font-display text-amber-900 text-3xl tracking-wide">{title}</h2>
      <div className="w-10 h-1 bg-[#F5C800]  rounded mt-1" />
    </div>
  );
}

export default function MenuSection({ activeTab }) {
  return (
    <div className=" px-4 pt-4 pb-24">

      {activeTab === 'garullas' && (
        <>
          <SectionHeader title="Garullas" />
          <div className="grid grid-cols-2 gap-3">
            {products.garullas.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}

      {activeTab === 'almojabanas' && (
        <>
          <SectionHeader title="Almojábanas" />
          <div className="grid grid-cols-2 gap-3">
            {products.almojabanas.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}

      {activeTab === 'combos' && (
        <>
          <SectionHeader title="Combos" />
          {/* Banner promo */}
          <div className="bg-[#D81B1B] rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-black text-[13px] text-white">¡Combos con descuento!</p>
              <p className="text-[11px] text-white/70">Ahorra hasta $4.000 en tu pedido</p>
            </div>
          </div>
          {combos.map(c => <ComboCard key={c.id} combo={c} />)}
        </>
      )}

      {activeTab === 'bebidas' && (
        <>
          <SectionHeader title="Bebidas" />
          {bebidas.map(b => <BebidaRow key={b.id} bebida={b} />)}
        </>
      )}

    </div>
  );
}