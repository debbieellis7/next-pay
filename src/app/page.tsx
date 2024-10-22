import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center h-screen text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">NextPay</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
