import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 p-10">
      <h2>Not Found</h2>
      <p>Could not find requested content</p>
      <Button asChild className="custom-scale custom-hover">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </section>
  );
}
