import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useBalance,
} from "wagmi";
import { formatBalance } from "./utils/format";
import "./App.css";
import { DisplayName } from "./DisplayName";

function App() {
  const { address, isConnected, chain } = useConnection();
  const connectors = useConnectors();
  const { mutate, isPending, error } = useConnect();
  const { mutate: disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (isConnected && address) {
    return (
      <div id="center">
        <h1>Wallet connected</h1>

        <DisplayName address={address} />

        <br />

        <p>Your balance is:</p>
        <p>
          {balance
            ? `${formatBalance(balance.value, balance.decimals)} ${balance.symbol}`
            : "…"}{" "}
          {chain?.name ?? "Unknown"}
        </p>

        <br />

        <button className="counter" type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div id="center">
      <h1>Connect your wallet</h1>
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
