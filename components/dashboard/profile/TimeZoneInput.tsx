"use client";
import type React from "react";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// List of time zones
const timeZones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Europe/Athens", label: "Eastern European Time (EET)" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST)" },
  { value: "Asia/Kolkata", label: "Indian Standard Time (IST)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
  { value: "Pacific/Auckland", label: "New Zealand Standard Time (NZST)" },
];

interface TimeZoneFieldProps {
  label?: string;
  onSelect: (timeZone: string) => void;
  value?: string;
}

const TimeZoneField: React.FC<TimeZoneFieldProps> = ({
  onSelect,
  value = "",
}) => {
  // const [open, setOpen] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState(value);

  const handleSelect = (timeZoneValue: string) => {
    setSelectedTimeZone(timeZoneValue);
    // setOpen(false);
    onSelect(timeZoneValue);
  };

  return (
    <div className="md:w-1/2 space-y-2 relative">
      {/* <Popover open={open} onOpenChange={setOpen}> */}
      <Popover>
        <PopoverTrigger asChild>
          {/* <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between cursor-pointer",
              !selectedTimeZone && "text-muted-foreground"
            )}
          >
            {selectedTimeZone
              ? timeZones.find((tz) => tz.value === selectedTimeZone)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button> */}
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search time zone..." />
            <CommandList>
              <CommandEmpty>No time zone found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {timeZones.map((timeZone) => (
                  <CommandItem
                    key={timeZone.value}
                    value={timeZone.value}
                    onSelect={() => handleSelect(timeZone.value)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTimeZone === timeZone.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {timeZone.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeZoneField;
