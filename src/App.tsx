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
import { Card, CardContent, CardHeader } from "./components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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

        <Card className="max-w-sm">
          <CardHeader>Your balance is:</CardHeader>
          <CardContent>
            <p>
              {balance
                ? `${formatBalance(balance.value, balance.decimals)} ${balance.symbol}`
                : "…"}{" "}
              {chain?.name ?? "Unknown"}
            </p>
          </CardContent>
        </Card>

        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Disconnect
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to disconnect?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will disconnect you from the wallet.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => disconnect()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div id="center">
      <h1>Connect your wallet</h1>
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="outline"
          disabled={isPending}
          onClick={() => mutate({ connector })}
        >
          Connect to ${connector.name}
        </Button>
      ))}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
