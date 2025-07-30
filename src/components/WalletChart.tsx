'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  selected: string[];
  period: '1d' | '7d' | '30d';
};

export default function WalletChart({ selected, period }: Props) {
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    if (!selected.length) return setDatasets([]);
    Promise.all(
      selected.map(async (addr) => {
        const res = await fetch(`/api/wallets/${addr}/summary?window=${period}`);
        const { snapshots } = await res.json();
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        return {
          label: addr.slice(0, 6),
          data: snapshots.map((s: any) => ({
            x: new Date(s.captured_at).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
            y: Number(s.balance_sol),
          })),
          borderColor: color,
          backgroundColor: color,
          fill: false,
        };
      })
    ).then(setDatasets);
  }, [selected, period]);

  const data = { datasets };

  return (
    <div className="w-full h-96">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { ticks: { color: '#cbd5e1' } }, x: { ticks: { color: '#cbd5e1' } } },
          plugins: { legend: { labels: { color: '#cbd5e1' } } },
        }}
      />
    </div>
  );
}