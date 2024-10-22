import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DashboardPage = async () => {
  const results = await db.select().from(Invoices);

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>
          <Button className="inline-flex gap-2" variant="ghost" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" /> Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="text-left font-medium p-4">
                <span className="font-semibold">
                  {new Date(result.createTs).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell className="text-left p-4">
                <span className="font-semibold">John Doe</span>
              </TableCell>
              <TableCell className="text-left  p-4">
                <span>johndoe@testmail.com</span>
              </TableCell>
              <TableCell className="text-center p-4">
                <Badge className="rounded-full">{result.status}</Badge>
              </TableCell>
              <TableCell className="text-right p-4">
                <span className="font-semibold">
                  $ {(result.value / 100).toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default DashboardPage;
