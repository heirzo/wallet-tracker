type Props = {
  period: '1d' | '7d' | '30d';
  setPeriod: (p: '1d' | '7d' | '30d') => void;
};

export default function PeriodSelector({ period, setPeriod }: Props) {
  const opts: ('1d' | '7d' | '30d')[] = ['1d', '7d', '30d'];
  return (
    <div className="mb-4 space-x-2">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => setPeriod(o)}
          className={`px-3 py-1 rounded ${period === o ? 'bg-sky-600' : 'bg-slate-700'}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}