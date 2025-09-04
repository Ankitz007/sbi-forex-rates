"use client";

import { useEffect, useState } from "react";
import { format, subDays, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Get today as the maximum selectable date
  const today = new Date();

  // Set default to the last available date from /check-dates (from today-10 to today).
  // If the API fails or returns no usable date, fall back to today.
  useEffect(() => {
    if (selectedDate) return;

    let cancelled = false;

    async function pickDefaultDate() {
      try {
        const start = subDays(today, 10);
        const from = format(start, "dd-MM-yyyy");
        const to = format(today, "dd-MM-yyyy");

        const res = await fetch(`/api/forex/check-dates?from=${from}&to=${to}`);
        if (!res.ok) throw new Error(`status=${res.status}`);

        const body = await res.json();
        const dates = Array.isArray(body?.data) ? body.data : [];

        if (dates.length > 0) {
          // API returns dates in descending order; take the last item (oldest available)
          const last = dates[dates.length - 1];
          const parsed = parse(last, "dd-MM-yyyy", new Date());
          if (isValid(parsed)) {
            if (!cancelled) onDateChange(parsed);
            return;
          }
        }

        // fallback
        if (!cancelled) onDateChange(today);
      } catch {
        if (!cancelled) onDateChange(today);
      }
    }

    pickDefaultDate();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, onDateChange, today]);

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange(date);
    setIsOpen(false); // Close the popover after selection
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date > today}
            showOutsideDays={false}
            captionLayout="dropdown"
            startMonth={new Date(2022, 0)}
            endMonth={new Date()}
            defaultMonth={selectedDate}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
