"use client";

// External dependencies
import { SyntheticEvent, useState } from "react";
import { CirclePlus } from "lucide-react";

// Internal components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";

// Actions
import { createAction } from "@/app/actions";

export default function CreateInvoice() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleOnSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      await createAction(new FormData(e.currentTarget as HTMLFormElement));

      // Close dialog on success
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex gap-2" variant="ghost">
          <CirclePlus className="h-4 w-4" /> Create Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-8">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Enter the billing details below and click save to create a new
            invoice.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="name" className="block font-semibold text-sm mb-2">
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" required />
          </div>
          <div>
            <Label htmlFor="email" className="block font-semibold text-sm mb-2">
              Billing Email
            </Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="value" className="block font-semibold text-sm mb-2">
              Value
            </Label>
            <Input id="value" name="value" type="number" required />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block font-semibold text-sm mb-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              className="w-full min-h-[80px]"
            />
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
