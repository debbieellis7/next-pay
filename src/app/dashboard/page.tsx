// External dependencies
import { auth } from "@clerk/nextjs/server";
import { eq, and, isNull, desc } from "drizzle-orm";
import { Suspense } from "react";

// Database configuration and schema
import { db } from "@/db";
import { Invoices, Customers } from "@/db/schema";

// Internal components
import Container from "@/components/Container";
import CreateInvoice from "./CreateInvoice";
import InvoiceRow from "@/components/InvoiceRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";

const INVOICES_PER_PAGE = 5;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined }>;
}) {
  const { userId, orgId } = await auth();

  if (!userId) return null;

  const getSearchParams = await searchParams;
  const currentPage = getSearchParams.page ? Number(getSearchParams.page) : 1;
  const offset = INVOICES_PER_PAGE * (currentPage - 1);

  const query = db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .orderBy(desc(Invoices.createTs));

  if (orgId) {
    query.where(eq(Invoices.organizationId, orgId));
  } else {
    query.where(
      and(eq(Invoices.userId, userId), isNull(Invoices.organizationId))
    );
  }

  // Total number of invoices
  const { length: invoicesCount } = await query;

  // Set results limit
  query.limit(INVOICES_PER_PAGE).offset(offset);
  const results = await query;
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
        <CreateInvoice />
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
          {invoices.map(invoice => (
            <InvoiceRow key={invoice.id} invoice={invoice} />
          ))}
        </TableBody>
      </Table>

      <Suspense
        fallback={
          <div className="text-center mt-4">Preparing pagination...</div>
        }
      >
        <Pagination
          currentPage={currentPage}
          invoicesCount={invoicesCount}
          perPage={INVOICES_PER_PAGE}
        />
      </Suspense>
    </Container>
  );
}
