import { createConfig, http } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { sepolia } from "viem/chains";

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(),
  },
});
