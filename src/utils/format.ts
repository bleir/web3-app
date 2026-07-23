import { formatUnits } from "viem";

export function formatBalance(
  value: bigint,
  decimals: number,
  displayDecimals = 4,
) {
  const [whole, fraction = ""] = formatUnits(value, decimals).split(".");
  return `${whole}.${fraction.padEnd(displayDecimals, "0").slice(0, displayDecimals)}`;
}
