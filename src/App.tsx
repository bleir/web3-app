import { formatUnits } from "viem";
import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useBalance,
} from "wagmi";
import "./App.css";

/** MetaMask-style display: fixed fractional digits (e.g. 0.0500). */
function formatBalance(
  value: bigint,
  decimals: number,
  displayDecimals = 4,
) {
  const [whole, fraction = ""] = formatUnits(value, decimals).split(".");
  return `${whole}.${fraction.padEnd(displayDecimals, "0").slice(0, displayDecimals)}`;
}

function App() {
  const { address, isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutate, isPending, error } = useConnect();
  const { mutate: disconnect } = useDisconnect();

  const { data: balance } = useBalance({ address });

  if (isConnected) {
    return (
      <div id="center">
        <h2>Wallet connected</h2>
        <p>
          Address: <code>{address}</code>
        </p>
        <button className="counter" type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
        <hr />
        <p>
          Balance:{" "}
          {balance
            ? `${formatBalance(balance.value, balance.decimals)} ${balance.symbol}`
            : "…"}
        </p>
      </div>
    );
  }

  return (
    <div id="center">
      <h2>Connect your wallet</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="counter"
          type="button"
          disabled={isPending}
          onClick={() => mutate({ connector })}
        >
          {isPending ? "Connecting…" : `Connect ${connector.name}`}
        </button>
      ))}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
