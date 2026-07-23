import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MPS } from "@/data/mps";
import { cn } from "@/lib/utils";

export function MPCombobox({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const items = useMemo(() => MPS, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-left outline-none focus:ring-2 focus:ring-ring",
            !value && "text-muted-foreground",
          )}
        >
          <span className="truncate">{value || "Search and select your MP…"}</span>
          <span aria-hidden className="ml-2 text-muted-foreground">▾</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(92vw,28rem)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Type MP name…" />
          <CommandList>
            <CommandEmpty>No MP found.</CommandEmpty>
            <CommandGroup>
              {items.map((name) => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                >
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
