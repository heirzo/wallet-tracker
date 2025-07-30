export async function fetchSolPrice(): Promise<number> {
  const res = await fetch('https://price.jup.ag/v6/price?ids=SOL');
  const json = await res.json();
  return json.data.SOL.price;
}