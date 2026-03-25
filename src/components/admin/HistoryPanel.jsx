import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fmt, fmtDate, fmtDateTime } from '../../utils/fmt';

export default function HistoryPanel() {
  const { history, clearHistory, stats } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = history.filter(o =>
    o.number.includes(search) ||
    o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  const grouped = filtered.reduce((acc, order) => {
    const date = fmtDate(order.completedAt);
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display text-white text-4xl tracking-wide">Historial</h1>
          <div className="w-10 h-1 bg-[#F5C800] rounded mt-1" />
        </div>
        {history.length > 0 && (
          <button
            onClick={() => { if (window.confirm('¿Borrar todo el historial? Esta acción no se puede deshacer.')) clearHistory(); }}
            className="text-[#D81B1B] text-xs font-bold bg-transparent border border-[#D81B1B]/30 rounded-xl px-3 py-2 cursor-pointer"
          >
            🗑️ Borrar
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4">
          <p className="text-white/40 text-xs font-bold uppercase tracking-wide">Total pedidos</p>
          <p className="font-black text-white text-2xl mt-1">{stats.totalOrders}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#F5C800]/30 rounded-2xl p-4">
          <p className="text-white/40 text-xs font-bold uppercase tracking-wide">Ingresos totales</p>
          <p className="font-black text-[#F5C800] text-2xl mt-1">{fmt(stats.totalRevenue)}</p>
        </div>
      </div>

      <input
        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#F5C800] mb-4 transition-colors"
        placeholder="🔍 Buscar por número o producto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {history.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-10 text-center text-white/30">
          <p className="text-3xl mb-2">📋</p>
          <p className="text-sm font-semibold">Sin historial todavía</p>
          <p className="text-xs mt-1">Los pedidos entregados aparecerán aquí</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 text-center text-white/30">
          <p className="text-sm">Sin resultados para "{search}"</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, orders]) => {
          const dayTotal = orders.reduce((sum, o) => sum + o.total, 0);
          return (
            <div key={date} className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/40 text-xs font-black uppercase tracking-widest">{date}</span>
                <span className="text-[#F5C800] text-xs font-black">{fmt(dayTotal)} · {orders.length} pedidos</span>
              </div>
              <div className="flex flex-col gap-2">
                {orders.map(order => (
                  <div key={order.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-sm">#{order.number}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-zinc-500/20 text-zinc-400 border-zinc-500/30">
                            Entregado
                          </span>
                        </div>
                        <p className="text-white/30 text-xs mt-0.5">{fmtDateTime(order.completedAt)}</p>
                      </div>
                      <span className="font-black text-[#F5C800] text-sm mr-2">{fmt(order.total)}</span>
                      <span className="text-white/20 text-xs">{expanded === order.id ? '▲' : '▼'}</span>
                    </div>
                    {expanded === order.id && (
                      <div className="border-t border-[#2A2A2A] px-4 py-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm mb-1.5">
                            <span>{item.emoji}</span>
                            <span className="flex-1 text-white/60 font-semibold">{item.name}</span>
                            <span className="text-white/30">x{item.qty}</span>
                            <span className="text-[#F5C800] font-bold">{fmt(item.subtotal)}</span>
                          </div>
                        ))}
                        {order.customerNote && (
                          <div className="mt-2 bg-[#2A2A2A] rounded-xl px-3 py-2">
                            <p className="text-white/30 text-[10px] uppercase font-bold mb-0.5">Nota</p>
                            <p className="text-white/60 text-xs">{order.customerNote}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}