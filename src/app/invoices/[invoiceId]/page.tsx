import { notFound } from "next/navigation";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { Invoices, Customers } from "@/db/schema";
import Invoice from "./Invoice";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId } = await auth();

  if (!userId) return;

  const { invoiceId } = await params;
  const parsedInvoiceId = parseInt(invoiceId);

  if (isNaN(parsedInvoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(and(eq(Invoices.id, parsedInvoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoices = {
    ...result.invoices,
    customer: result.customers,
  };

  return <Invoice invoice={invoices} />;
}
