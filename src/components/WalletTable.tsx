'use client';
import { useEffect, useState } from 'react';

type Wallet = {
  address: string;
  walletname: string;
  balance_sol: number;
  balance_usd: number;
  delta?: number;
};

type Props = {
  period: '1d' | '7d' | '30d';
  selected: string[];
  setSelected: (s: string[]) => void;
};

export default function WalletTable({ period, selected, setSelected }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    fetch('/api/wallets')
      .then((r) => r.json())
      .then(setWallets);
  }, []);

  useEffect(() => {
    Promise.all(
      wallets.map(async (w) => {
        const res = await fetch(`/api/wallets/${w.address}/summary?window=${period}`);
        const { delta } = await res.json();
        return { ...w, delta };
      })
    ).then(setWallets);
  }, [period, wallets.length]);

  const toggle = (addr: string) =>
    setSelected(
      selected.includes(addr)
        ? selected.filter((a) => a !== addr)
        : [...selected, addr]
    );

  return (
    <table className="w-full text-sm mb-6">
      <thead>
        <tr className="border-b">
          <th></th>
          <th>Wallet</th>
          <th>SOL</th>
          <th>USD</th>
          <th>Δ {period}</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((w) => (
          <tr key={w.address}>
            <td>
              <input
                type="checkbox"
                checked={selected.includes(w.address)}
                onChange={() => toggle(w.address)}
              />
            </td>
            <td>{w.walletname}</td>
            <td>{w.balance_sol.toFixed(2)}</td>
            <td>${w.balance_usd.toFixed(2)}</td>
            <td className={w.delta && w.delta > 0 ? 'text-green-400' : 'text-red-400'}>
              {w.delta !== undefined && (
                <>
                  {w.delta > 0 ? '↑' : '↓'} {Math.abs(w.delta).toFixed(2)}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}