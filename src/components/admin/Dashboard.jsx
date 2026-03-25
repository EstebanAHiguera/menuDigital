import { useApp } from '../../context/AppContext';
import { fmt, fmtDateTime } from '../../utils/fmt';
import { ORDER_STATUSES } from '../../Data/Products';

function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`bg-[#1A1A1A] border rounded-2xl p-4 flex flex-col gap-2 ${accent ? 'border-[#F5C800]/40' : 'border-[#2A2A2A]'}`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {accent && <span className="text-[10px] font-black text-[#F5C800] bg-[#F5C800]/10 px-2 py-0.5 rounded-full uppercase tracking-wide">Activo</span>}
      </div>
      <div className={`font-black text-2xl ${accent ? 'text-[#F5C800]' : 'text-white'}`}>{value}</div>
      <div className="text-white/40 text-xs font-semibold">{label}</div>
    </div>
  );
}

export default function Dashboard({ onNavigate }) {
  const { stats, orders, history } = useApp();
  const activeOrders = orders.filter(o => o.status !== 'entregado');

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="mb-6">
        <h1 className="font-display text-white text-4xl tracking-wide">Dashboard</h1>
        <div className="w-10 h-1 bg-[#F5C800] rounded mt-1" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard icon="🧾" label="Pedidos activos"  value={stats.activeOrders} accent={stats.activeOrders > 0} />
        <StatCard icon="⏳" label="Pendientes"       value={stats.pendingOrders} accent={stats.pendingOrders > 0} />
        <StatCard icon="📦" label="Completados"      value={stats.totalOrders} />
        <StatCard icon="💰" label="Ingresos totales" value={fmt(stats.totalRevenue)} />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-white text-2xl tracking-wide">Pedidos activos</h2>
          {activeOrders.length > 0 && (
            <button onClick={() => onNavigate('orders')} className="text-[#F5C800] text-xs font-bold bg-transparent border-none cursor-pointer">
              Ver todos →
            </button>
          )}
        </div>

        {activeOrders.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 text-center text-white/30">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-sm font-semibold">Sin pedidos activos</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {activeOrders.slice(0, 4).map(order => {
              const statusInfo = ORDER_STATUSES.find(s => s.id === order.status);
              return (
                <div key={order.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-white text-sm">#{order.number}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo?.color}`}>
                        {statusInfo?.label}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs mt-0.5">{order.items.length} producto(s) · {fmt(order.total)}</p>
                  </div>
                  <button onClick={() => onNavigate('orders')} className="text-[#F5C800] text-lg bg-transparent border-none cursor-pointer">→</button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-white text-2xl tracking-wide">Últimos entregados</h2>
            <button onClick={() => onNavigate('history')} className="text-[#F5C800] text-xs font-bold bg-transparent border-none cursor-pointer">
              Ver historial →
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {history.slice(0, 3).map(order => (
              <div key={order.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-sm">#{order.number}</span>
                  <p className="text-white/40 text-xs mt-0.5">{fmtDateTime(order.completedAt)}</p>
                </div>
                <span className="font-black text-[#F5C800] text-sm">{fmt(order.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}