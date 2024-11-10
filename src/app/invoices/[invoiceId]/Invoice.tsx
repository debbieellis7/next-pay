"use client";

// External dependencies
import { useOptimistic } from "react";
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from "lucide-react";
import Link from "next/link";

// Database schema
import { Invoices, Customers } from "@/db/schema";

// Internal components
import Container from "@/components/Container";
import InvoiceBadge from "@/components/InvoiceBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Actions and data
import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
import { AVAILABLE_STATUSES } from "@/data/invoices";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect;
  };
}

export default function Invoice({ invoice }: InvoiceProps) {
  const [currentState, setCurrentStatus] = useOptimistic(
    invoice.status,
    (state, newStatus) => String(newStatus)
  );

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentState;

    setCurrentStatus(formData.get("status"));

    try {
      await updateStatusAction(formData);
    } catch {
      setCurrentStatus(originalStatus);
    }
  }

  return (
    <Container>
      <div className="flex lg:flex-row lg:justify-between">
        <h1 className="flex items-center gap-4 text-3xl font-bold">
          Invoice {invoice.id}
          <InvoiceBadge status={currentState} />
        </h1>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                Change Status
                <ChevronDown className="w-4 h-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {AVAILABLE_STATUSES.map(status => {
                return (
                  <DropdownMenuItem key={status.id}>
                    <form action={handleOnUpdateStatus}>
                      <input type="hidden" name="id" value={invoice.id} />
                      <input type="hidden" name="status" value={status.id} />
                      <button>{status.label}</button>
                    </form>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                  <span className="sr-only">More Options</span>
                  <Ellipsis className="w-4 h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2">
                      <Trash2 className="w-4 h-auto" />
                      Delete Invoice
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`/invoices/${invoice.id}/payment`}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-auto" />
                    Payment
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader className="items-center">
                <DialogTitle className="text-2xl">Delete Invoice?</DialogTitle>
                <DialogDescription className="text-center">
                  This action cannot be undone. This will permanently delete
                  your invoice and remove your data from our servers.
                </DialogDescription>
                <DialogFooter>
                  <form action={deleteInvoiceAction}>
                    <input type="hidden" name="id" value={invoice.id} />
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-auto" />
                      Delete Invoice
                    </Button>
                  </form>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <p className="text-3xl mb-3">$ {(invoice.value / 100).toFixed(2)}</p>

      <p className="text-lg mb-8">{invoice.description}</p>

      <h2 className="font-bold text-lg mb-4">Billing Details</h2>

      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice ID
          </strong>
          <span>{invoice.id}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice Date
          </strong>
          <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Name
          </strong>
          <span>{invoice.customer.name}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Email
          </strong>
          <span>{invoice.customer.email}</span>
        </li>
      </ul>
    </Container>
  );
}
