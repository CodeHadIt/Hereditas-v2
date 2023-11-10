"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
const ErrorPage = ({
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
      <p>{`Seems like you're trying to access the dahsboard`}</p>
      <div className="flex gap-4">
        <Button asChild className="custom-scale custom-hover">
          <Link href="/app/dashboard">Go to dashboard</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
