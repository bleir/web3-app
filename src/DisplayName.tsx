import { useEnsName } from "wagmi";
import { shortenAddress } from "./utils/format";

export const DisplayName = ({ address }: { address: string }) => {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` });

  if (!ensName) {
    return (
      <div>
        <p>You don't have an ENS name.</p>
        <br />
        <p>Your address is:</p>
        <p>
          <code>{shortenAddress(address)}</code>
        </p>
      </div>
    );
  }

  return <p>ENS Name: {ensName}</p>;
};
