"use client";

import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
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
  // Get yesterday as the maximum selectable date
  const yesterday = subDays(new Date(), 1);

  // Set default to yesterday when component mounts if no date is selected
  useEffect(() => {
    if (!selectedDate) {
      onDateChange(yesterday);
    }
  }, [selectedDate, onDateChange, yesterday]);

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
            disabled={(date) => date > yesterday}
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
