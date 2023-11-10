'use client'
import React from 'react'
import CreateGiftForm from '../../(beneficiary)/_components/createGiftForm';
import { useAccount } from 'wagmi';
import ConnectRequest from '@/components/common/connectRequest';

const CreateGiftMain = () => {
  const { address } = useAccount();

  return (
    <div className="flex justify-center items-center gap-9 max-w-4xl text-center">
      {address ? <CreateGiftForm /> : <ConnectRequest />}
    </div>
  );
}

export default CreateGiftMain