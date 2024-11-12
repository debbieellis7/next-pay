// External dependencies
import Link from "next/link";

// Internal components
import InvoiceBadge from "./InvoiceBadge";
import { TableRow, TableCell } from "./ui/table";

interface InvoiceRowProps {
  invoice: {
    customer: {
      name: string;
      email: string;
    };
    id: number;
    createTs: Date;
    value: number;
    status: string;
  };
}

const InvoiceRow = ({ invoice }: InvoiceRowProps) => (
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
        <InvoiceBadge status={invoice.status} />
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
);

export default InvoiceRow;
