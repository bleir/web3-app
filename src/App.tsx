import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useBalance,
} from "wagmi";
import { formatBalance } from "./utils/format";
import { DisplayName } from "./DisplayName";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "./components/ui/card";
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
  const { address, isConnected, chain, chainId } = useConnection();
  const connectors = useConnectors();
  const { mutate, isPending, error } = useConnect();
  const { mutate: disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (isConnected && address) {
    return (
      <>
        <div className="flex justify-between items-center p-4">
          <h2>Web3 Dashboard</h2>
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

        <div className="flex flex-row gap-4">
          <DisplayName address={address} className="w-1/3" />

          <Card className="max-w-sm p-2 text-left w-1/3">
            <CardHeader>
              <h2>Your chain is:</h2>
            </CardHeader>
            <CardContent>
              <p>
                Chain name: <b>{chain?.name ?? "Unknown"}</b>
              </p>
              <p>
                Chain id: <b>{chainId ?? "Unknown"}</b>
              </p>
            </CardContent>
            <CardAction className="flex justify-end">
              <Button variant="link">Change chain</Button>
            </CardAction>
          </Card>

          <Card className="max-w-sm w-1/4">
            <CardHeader>
              <h2>Your balance is:</h2>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-medium">
                {balance
                  ? `${formatBalance(balance.value, balance.decimals)} ${balance.symbol}`
                  : "…"}{" "}
                <br />
                {chain?.name ?? "Unknown"}
              </p>
            </CardContent>
          </Card>
        </div>
      </>
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
