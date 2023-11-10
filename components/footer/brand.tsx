import React from 'react'
import Image from 'next/image'
import { Gift } from "lucide-react";
import Link from 'next/link';

const Brand = () => {
  return (
    <div className="flex flex-col items-center md:items-start justify-start gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Gift size={40} />
        <div className="md:text-2xl text-xl">Hereditas</div>
      </Link>
      <p className="text-center md:text-start text-paragraph text-[12px] max-w-[300px] md:max-w-[400px]">
        We are a decentralized platform building cutting edge blockchain
        applications to help people manange their finances better today and
        tommorrow!
      </p>
    </div>
  );
}

export default Brand