import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TerminologyProps {
  term: string;
  definition: string;
  originalTerm?: string;
}

export function Terminology({ term, definition, originalTerm }: TerminologyProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <span className="relative inline-block">
          <span className="cursor-help font-semibold">{term}</span>
          <span
            className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -skew-x-12"
          ></span>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-100 border border-gray-300">
        <div className="mb-2">
          <h4 className="font-bold">{originalTerm || term}</h4>
        </div>
        <p>{definition}</p>
      </PopoverContent>
    </Popover>
  );
}
