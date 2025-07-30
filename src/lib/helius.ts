const HELIUS_RPC = process.env.HELIUS_RPC!;
export async function fetchNativeBalance(address: string): Promise<number> {
  const res = await fetch(HELIUS_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [address],
    }),
  });
  const json = await res.json();
  return json.result.value / 1e9;
}