// External dependencies
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Internal components
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  invoicesCount: number;
  perPage: number;
}

const Pagination = ({
  currentPage,
  invoicesCount,
  perPage,
}: PaginationProps) => {
  return (
    <ul className="flex justify-between items-center text-sm mt-8">
      <li>
        {currentPage > 1 && (
          <Link
            href={{
              pathname: "/dashboard",
              query: {
                page: currentPage - 1,
              },
            }}
          >
            <span className="flex items-center gap-1">
              <ChevronLeft className="w-5 h-5" /> Previous
            </span>
          </Link>
        )}
        {currentPage <= 1 && (
          <span className="flex items-center gap-1 text-zinc-400">
            <ChevronLeft className="w-5 h-5" /> Previous
          </span>
        )}
      </li>

      <li className="flex-grow flex justify-center">
        <ul className="flex items-center gap-3">
          {[...new Array(Math.ceil(invoicesCount / perPage))].map(
            (_, index) => {
              const page = index + 1;

              return (
                <li key={page}>
                  <Button
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    className="h-auto px-2.5 py-1"
                  >
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: {
                          page,
                        },
                      }}
                    >
                      {page}
                    </Link>
                  </Button>
                </li>
              );
            }
          )}
        </ul>
      </li>

      <li>
        {currentPage < Math.ceil(invoicesCount / perPage) && (
          <Link
            href={{
              pathname: "/dashboard",
              query: {
                page: currentPage + 1,
              },
            }}
          >
            <span className="flex items-center gap-1">
              Next <ChevronRight className="w-5 h-5" />
            </span>
          </Link>
        )}
        {currentPage >= Math.ceil(invoicesCount / perPage) && (
          <span className="flex items-center gap-1 text-zinc-400">
            Next <ChevronRight className="w-5 h-5" />
          </span>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
