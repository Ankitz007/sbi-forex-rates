"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DatePicker } from "@/components/date-picker";
import { ForexDataDisplay } from "@/components/forex-data-display";
import { Input } from "@/components/ui/input";
import {
  ForexRateResponse,
  StandardResponse,
  ForexDataByCategory,
} from "@/types/api";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [forexData, setForexData] = useState<ForexDataByCategory>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const fetchForexData = async (date: Date) => {
    setIsLoading(true);
    try {
      const dateStr = format(date, "dd-MM-yyyy");
      const response = await fetch(`/api/forex?date=${dateStr}`);
      const data: StandardResponse<ForexRateResponse[]> = await response.json();

      if (data.success && data.data) {
        const groupedData: ForexDataByCategory = {};
        data.data.forEach((item) => {
          if (!groupedData[item.category]) {
            groupedData[item.category] = [];
          }
          groupedData[item.category]!.push(item);
        });
        setForexData(groupedData);
      } else {
        setForexData({});
      }
    } catch (error) {
      console.error("Error fetching forex data:", error);
      setForexData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchForexData(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-justify space-y-4">
            <div className="mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
              <p>
                As per the Income-tax Rules, 1962, the rate of exchange used for
                reporting all foreign income/assets should be the telegraphic
                transfer (TT) buying rate adopted by the State Bank of India
                (SBI). The SBI publishes these rates online for any given day.
                However, it does not maintain a historical archive of the rates.
                This website aims to independently maintain a historical archive
                of the official forex rates published daily by the SBI, from 1st
                January 2022 onwards. These rates are taken from the "To be used
                as reference rates" section of the SBI publication.
              </p>
            </div>
          </div>

          {/* Sticky Date Picker Section */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-0 py-4">
            {/* relative wrapper so the mobile overlay can be absolutely positioned */}
            <div className="relative">
              {/* Single-row, no-wrap toolbar */}
              <div className="flex items-center justify-between gap-3 flex-nowrap">
                {/* Date Picker grows, can shrink without wrapping */}
                <div className="min-w-0 flex-1">
                  <DatePicker
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                </div>

                {/* Right rail: fixed-size container for search controls */}
                <div className="flex items-center justify-end flex-none">
                  {/* Desktop: Always show search bar */}
                  <div className="hidden sm:flex items-center gap-2 w-64">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search currency or ticker..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:placeholder:text-sm placeholder:text-xs"
                    />
                  </div>

                  {/* Mobile: show just the icon (no layout shift) */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="sm:hidden inline-flex p-2 rounded-full hover:bg-muted shrink-0"
                    aria-label="Open search"
                  >
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Mobile overlay search (absolute, so it doesn't push/wrap) */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="sm:hidden absolute inset-x-0 top-0 z-50"
                  >
                    <div className="flex items-center gap-2 bg-background border rounded-xl p-2 shadow-md">
                      <Input
                        autoFocus
                        placeholder="Search currency or ticker..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 placeholder:text-xs"
                      />
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        className="p-2 rounded-full hover:bg-muted shrink-0"
                        aria-label="Close search"
                      >
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <ForexDataDisplay
            data={forexData}
            isLoading={isLoading}
            selectedDate={selectedDate}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
