"use client";
import { useOptimistic } from "react";
import { ChevronDown } from "lucide-react";
import { Invoices } from "@/db/schema";
import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { updateStatusAction } from "@/app/actions";
import { AVAILABLE_STATUSES } from "@/data/invoices";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect;
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
    } catch (err) {
      setCurrentStatus(originalStatus);
    }
  }

  return (
    <main className="w-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-bold">
            Invoice {invoice.id}
            <Badge
              className={cn(
                "rounded-full capitalize",
                currentState === "open" && "bg-blue-500",
                currentState === "paid" && "bg-green-600",
                currentState === "void" && "bg-zinc-700",
                currentState === "uncollectible" && "bg-red-600"
              )}
            >
              {currentState}
            </Badge>
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                Change Status
                <ChevronDown className="w-4 h-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {AVAILABLE_STATUSES.map((status) => {
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
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
