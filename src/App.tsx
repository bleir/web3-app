import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from "wagmi";
import "./App.css";

function App() {
  const { address, isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutate, isPending, error } = useConnect();
  const { mutate: disconnect } = useDisconnect();

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
