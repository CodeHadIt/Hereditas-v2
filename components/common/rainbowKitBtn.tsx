'use client'
import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image';

const RainbowKitBtn: any = ({label}: {label?: string}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            // className="bg-primary h-10 px-4 py-2 custom-scale custom-hover text-white"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="bg-primary h-10 px-4 py-2 custom-scale custom-hover text-primary-foreground rounded-md text-sm font-medium"
                    onClick={openConnectModal}
                    type="button"
                  >
                    {label}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="bg-primary h-10 px-4 py-2 custom-scale custom-hover text-primary-foreground rounded-md text-sm font-medium"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="bg-primary h-10 px-4 py-2 custom-scale custom-hover text-primary-foreground rounded-md text-sm font-medium"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-primary h-10 px-4 py-2 custom-scale custom-hover text-primary-foreground rounded-md text-sm font-medium"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default RainbowKitBtn