const TABS = [
  { id: 'garullas',    label: 'Garullas' },
  { id: 'almojabanas', label: 'Almojábanas' },
  { id: 'combos',      label: 'Combos' },
  { id: 'bebidas',     label: 'Bebidas' },
  { id: 'ubicacion',   label: '📍 Cómo llegar' },
];

export default function NavPills({ active, onChange }) {
  return (
    <nav className="flex gap-2 overflow-x-auto px-6 py-6 pt-6 bg-[#1A1A1A] border-b border-[#2A2A2A] scrollbar-none">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold cursor-pointer border transition-all
            ${active === tab.id
              ? 'bg-[#F5C800] text-[#0D0D0D] border-[#F5C800]'
              : 'bg-transparent text-white/50 border-[#2A2A2A] hover:text-white/80'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}