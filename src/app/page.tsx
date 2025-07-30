'use client';
import { useEffect, useState } from 'react';
import WalletTable from '@/components/WalletTable';
import WalletChart from '@/components/WalletChart';
import PeriodSelector from '@/components/PeriodSelector';

export default function Home() {
  const [period, setPeriod] = useState<'1d' | '7d' | '30d'>('1d');
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4">
      <h1 className="text-2xl font-bold mb-4">SOL Whales Tracker</h1>
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <WalletTable period={period} selected={selected} setSelected={setSelected} />
      <WalletChart selected={selected} period={period} />
    </main>
  );
}