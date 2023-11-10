'use client'
import { ReactNode } from "react"
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, Theme } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, sepolia, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useTheme } from "next-themes";
import merge from "lodash.merge"

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, sepolia, goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_SEPOLIA_API! }),
    publicProvider(),
  ]
);

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const { connectors } = getDefaultWallets({
  appName: "Hereditas",
  projectId,
  chains,
});

const appInfo = {
  appName: "Hereditas Wills App",
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

type ProviderProps = {
  children: ReactNode;
};

const WalletProviders = ({ children }: ProviderProps) => {
  const { theme } = useTheme();
  const darkMode = merge(darkTheme(), {
    colors: {
      modalBackground:"rgb(2,7,23)",
    },
  } as Theme);
  const walletTheme = theme === "dark" ? darkMode : lightTheme();

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo} theme={walletTheme}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProviders;