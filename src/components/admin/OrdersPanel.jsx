import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fmt, fmtDateTime } from '../../utils/fmt';
import { ORDER_STATUSES } from '../../Data/Products';

const STATUS_NEXT = {
  pendiente:   'preparacion',
  preparacion: 'listo',
  listo:       'entregado',
};

const STATUS_LABEL_NEXT = {
  pendiente:   '🍳 Iniciar preparación',
  preparacion: '✅ Marcar como listo',
  listo:       '🚀 Marcar entregado',
};

function OrderCard({ order, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const statusInfo = ORDER_STATUSES.find(s => s.id === order.status);
  const nextStatus = STATUS_NEXT[order.status];

  return (
    <div className={`bg-[#1A1A1A] border rounded-2xl overflow-hidden transition-all
      ${order.status === 'pendiente'   ? 'border-yellow-500/40' :
        order.status === 'preparacion' ? 'border-blue-500/40'   :
        order.status === 'listo'       ? 'border-green-500/40'  :
        'border-[#2A2A2A]'}`}
    >
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-white text-sm">#{order.number}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo?.color}`}>
              {statusInfo?.label}
            </span>
          </div>
          <p className="text-white/40 text-xs mt-0.5">
            {order.items.length} producto(s) · {fmt(order.total)} · {fmtDateTime(order.createdAt)}
          </p>
        </div>
        <span className="text-white/30 text-sm">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="border-t border-[#2A2A2A] px-4 py-3">
          <div className="flex flex-col gap-1.5 mb-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-base">{item.emoji}</span>
                <span className="flex-1 text-white/70 font-semibold">{item.name}</span>
                <span className="text-white/40">x{item.qty}</span>
                <span className="text-[#F5C800] font-bold">{fmt(item.subtotal)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center py-2 border-t border-[#2A2A2A] mb-3">
            <span className="text-white/50 text-sm font-semibold">Total</span>
            <span className="text-[#F5C800] font-black text-base">{fmt(order.total)}</span>
          </div>

          {order.customerNote && (
            <div className="bg-[#2A2A2A] rounded-xl px-3 py-2 mb-3">
              <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Nota del cliente</p>
              <p className="text-white/70 text-sm">{order.customerNote}</p>
            </div>
          )}

          <div className="flex gap-2">
            {nextStatus && (
              <button
                onClick={() => onStatusChange(order.id, nextStatus)}
                className="flex-1 py-2.5 bg-[#F5C800] text-[#0D0D0D] rounded-xl font-black text-sm border-none cursor-pointer active:scale-95 transition-transform"
              >
                {STATUS_LABEL_NEXT[order.status]}
              </button>
            )}
            {order.status === 'entregado' && (
              <div className="flex-1 py-2.5 bg-green-500/10 text-green-400 rounded-xl font-black text-sm text-center">
                ✅ Entregado
              </div>
            )}
            <button
              onClick={() => onDelete(order.id)}
              className="py-2.5 px-3 bg-[#D81B1B]/10 text-[#D81B1B] rounded-xl font-bold text-sm border-none cursor-pointer active:scale-95 transition-transform"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPanel() {
  const { orders, updateOrderStatus, deleteOrder } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="mb-5">
        <h1 className="font-display text-white text-4xl tracking-wide">Pedidos</h1>
        <div className="w-10 h-1 bg-[#F5C800] rounded mt-1" />
      </div>

      <div className="grid grid-cols-4 gap-1.5 mb-5">
        {ORDER_STATUSES.map(s => {
          const count = orders.filter(o => o.status === s.id).length;
          return (
            <div key={s.id} className={`rounded-xl p-2.5 text-center border ${s.color}`}>
              <div className="font-black text-xl">{count}</div>
              <div className="text-[10px] font-bold opacity-80 leading-tight mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        <button
          onClick={() => setFilterStatus('all')}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border cursor-pointer transition-all
            ${filterStatus === 'all' ? 'bg-[#F5C800] text-[#0D0D0D] border-[#F5C800]' : 'bg-transparent text-white/40 border-[#2A2A2A]'}`}
        >
          Todos ({orders.length})
        </button>
        {ORDER_STATUSES.map(s => (
          <button
            key={s.id}
            onClick={() => setFilterStatus(s.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border cursor-pointer transition-all
              ${filterStatus === s.id ? 'bg-[#F5C800] text-[#0D0D0D] border-[#F5C800]' : 'bg-transparent text-white/40 border-[#2A2A2A]'}`}
          >
            {s.label} ({orders.filter(o => o.status === s.id).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-10 text-center text-white/30">
          <p className="text-3xl mb-2">📭</p>
          <p className="text-sm font-semibold">Sin pedidos{filterStatus !== 'all' ? ' con este estado' : ''}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={updateOrderStatus}
              onDelete={(id) => { if (window.confirm('¿Eliminar este pedido?')) deleteOrder(id); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}