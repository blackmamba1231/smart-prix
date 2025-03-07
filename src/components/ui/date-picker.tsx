"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  className?: string;
  date: {
    from: Date;
    to: Date;
  };
  setDate: (date: {
    from: Date;
    to: Date;
  }) => void;
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  const handleDateSelect = (selected: DateRange | undefined) => {
    if (selected?.from && selected?.to) {
      setDate({ from: selected.from, to: selected.to });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" // Added for dark mode
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" // Added for dark mode
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            classNames={{
              weekday: "text-center font-medium text-sm text-gray-500 dark:text-gray-400", // Added for dark mode
              weekdays: "grid grid-cols-7 gap-0.5 mb-2",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
