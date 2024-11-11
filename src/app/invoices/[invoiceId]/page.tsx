// External dependencies
import { notFound } from "next/navigation";
import { eq, and, isNull } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// Database configuration and schema
import { db } from "@/db";
import { Invoices, Customers } from "@/db/schema";

// Internal components
import Invoice from "./Invoice";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { userId, orgId } = await auth();

  if (!userId) return;

  const { invoiceId } = await params;
  const parsedInvoiceId = parseInt(invoiceId);

  if (isNaN(parsedInvoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  let result;

  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, parsedInvoiceId),
          eq(Invoices.organizationId, orgId)
        )
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, parsedInvoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoices = {
    ...result.invoices,
    customer: result.customers,
  };

  return <Invoice invoice={invoices} />;
}
