# Web3 Dashboard

A React dashboard for connecting a wallet and viewing on-chain account details. Built with [wagmi](https://wagmi.sh/), [viem](https://viem.sh/), and [Vite](https://vite.dev/).

## Features

- Connect with MetaMask
- Shortened address display
- Native balance formatted for readability (e.g. `0.0500 ETH`)
- Connected network name (currently Sepolia)
- Confirm before disconnect
- UI components via [shadcn/ui](https://ui.shadcn.com/)

## Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, shadcn/ui (Base UI) |
| Web3 | wagmi v3, viem, MetaMask connector |
| Data | TanStack Query |

## Getting started

```bash
pnpm install
pnpm dev
```

Open the local URL Vite prints (usually `http://localhost:5173`), then connect MetaMask on the Sepolia network.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Typecheck and build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run Oxlint |

## Network

The app is configured for **Sepolia** in `src/config.ts`. To target another chain, update the wagmi `createConfig` chains and transports there.
