import React from 'react'
import RainbowKitBtn from './rainbowKitBtn';

const ConnectRequest = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6">
      <RainbowKitBtn label="Connect Wallet" />
      <p className="text-sm text-paragraph">
        Connect your wallet and view gifts.
      </p>
    </div>
  );
}

export default ConnectRequest