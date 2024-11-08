"use client";

// External dependencies
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

// Internal components
import { Button } from "@/components/ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="relative w-full font-semibold">
      <span className={pending ? "text-transparent" : ""}>Submit</span>
      {pending && (
        <span className="absolute flex items-center justify-center w-full h-full text-gray-400">
          <LoaderCircle className="animate-spin" />
        </span>
      )}
    </Button>
  );
};

export default SubmitButton;
