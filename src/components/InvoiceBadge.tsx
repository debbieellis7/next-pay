// Internal components
import { Badge } from "@/components/ui/badge";

// Utilities
import { cn } from "@/lib/utils";

interface InvoiceBadgeProps {
  status: string;
}

const InvoiceBadge: React.FC<InvoiceBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={cn(
        "rounded-full capitalize",
        status === "open" && "bg-blue-500",
        status === "paid" && "bg-green-600",
        status === "void" && "bg-zinc-700",
        status === "uncollectible" && "bg-red-600"
      )}
    >
      {status}
    </Badge>
  );
};

export default InvoiceBadge;
