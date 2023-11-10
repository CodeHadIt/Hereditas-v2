'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react'

const HomeErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 p-10">
      <p>
        An unexpected error occured. <br />
        {`Don't worry, your funds are safe in your wallet`}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="custom-scale custom-hover">
          Try Again
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </section>
  );
};

export default HomeErrorPage