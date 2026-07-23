import { useEnsName } from "wagmi";
import { shortenAddress } from "./utils/format";
import { Card, CardDescription } from "@/components/ui/card";
import { useCallback } from "react";

export const DisplayName = ({ address }: { address: string }) => {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` });

  const renderContent = useCallback(() => {
    if (!ensName) {
      return (
        <>
          <p>You don't have an ENS name.</p>
          <p>Your address is:</p>
          <CardDescription>
            <code>{shortenAddress(address)}</code>
          </CardDescription>
        </>
      );
    }
  }, [ensName, address]);

  return <Card className="max-w-sm p-4">{renderContent()}</Card>;

  return <p>ENS Name: {ensName}</p>;
};
