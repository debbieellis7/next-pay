// External dependencies
import { auth } from "@clerk/nextjs/server";
import { eq, and, isNull } from "drizzle-orm";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

// Database configuration and schema
import { db } from "@/db";
import { Invoices, Customers } from "@/db/schema";

// Internal components
import Container from "@/components/Container";
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

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  if (!userId) return;

  let results;

  if (orgId) {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(eq(Invoices.organizationId, orgId));
  } else {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(and(eq(Invoices.userId, userId), isNull(Invoices.organizationId)));
  }

  const invoices = results.map(({ invoices, customers }) => {
    return {
      ...invoices,
      customer: customers,
    };
  });

  return (
    <Container>
      <div className="flex justify-between mb-7">
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="text-left font-medium p-0">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="font-semibold block p-4"
                >
                  {new Date(invoice.createTs).toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="text-left p-0">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="font-semibold block p-4"
                >
                  {invoice.customer.name}
                </Link>
              </TableCell>
              <TableCell className="text-left p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  {invoice.customer.email}
                </Link>
              </TableCell>
              <TableCell className="text-center p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  <Badge className="rounded-full">{invoice.status}</Badge>
                </Link>
              </TableCell>
              <TableCell className="text-right p-0">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="font-semibold block p-4"
                >
                  $ {(invoice.value / 100).toFixed(2)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
