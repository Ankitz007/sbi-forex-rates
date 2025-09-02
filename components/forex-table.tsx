"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ForexRateResponse } from "@/types/api";
import { CurrencyFlag } from "@/components/utils/country-mapping";

interface ForexTableProps {
  data: ForexRateResponse[];
  category: string;
  searchTerm: string;
}

type SortField = keyof ForexRateResponse;
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 10;
const PRIORITY_CURRENCIES = ["USD", "EUR", "GBP", "JPY"];

export function ForexTable({ data, category, searchTerm }: ForexTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter and sort data
  const { filteredAndSortedData, totalPages } = useMemo(() => {
    let filtered = data.filter(
      (item) =>
        item.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Separate priority currencies and others
    const priorityCurrencies = filtered.filter((item) =>
      PRIORITY_CURRENCIES.includes(item.ticker)
    );
    const otherCurrencies = filtered.filter(
      (item) => !PRIORITY_CURRENCIES.includes(item.ticker)
    );

    // Sort priority currencies in the order of PRIORITY_CURRENCIES
    priorityCurrencies.sort((a, b) => {
      const aIndex = PRIORITY_CURRENCIES.indexOf(a.ticker);
      const bIndex = PRIORITY_CURRENCIES.indexOf(b.ticker);
      return aIndex - bIndex;
    });

    // Apply sorting if a sort field is selected
    if (sortField) {
      const sortFunction = (a: ForexRateResponse, b: ForexRateResponse) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          return sortDirection === "asc" ? comparison : -comparison;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          const comparison = aValue - bValue;
          return sortDirection === "asc" ? comparison : -comparison;
        }

        return 0;
      };

      priorityCurrencies.sort(sortFunction);
      otherCurrencies.sort(sortFunction);
    }

    // Combine priority currencies first, then others
    const combined = [...priorityCurrencies, ...otherCurrencies];

    // Pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = combined.slice(startIndex, endIndex);
    const totalPages = Math.ceil(combined.length / ITEMS_PER_PAGE);

    return {
      filteredAndSortedData: paginatedData,
      totalPages,
    };
  }, [data, searchTerm, sortField, sortDirection, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const formatValue = (value: number) => {
    return value.toFixed(2);
  };

  const isPriorityCurrency = (ticker: string) =>
    PRIORITY_CURRENCIES.includes(ticker);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("currency")}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Currency
                  <SortIcon field="currency" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("ticker")}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Ticker
                  <SortIcon field="ticker" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">TT Buy</TableHead>
              <TableHead className="font-semibold">TT Sell</TableHead>
              <TableHead className="font-semibold">Bill Buy</TableHead>
              <TableHead className="font-semibold">Bill Sell</TableHead>
              <TableHead className="font-semibold">FTC Buy</TableHead>
              <TableHead className="font-semibold">FTC Sell</TableHead>
              <TableHead className="font-semibold">CN Buy</TableHead>
              <TableHead className="font-semibold">CN Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-8 text-muted-foreground"
                >
                  {searchTerm
                    ? "No results found for your search."
                    : "No data available."}
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((item) => (
                <TableRow
                  key={item.id}
                  className={
                    isPriorityCurrency(item.ticker)
                      ? "bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-950/30"
                      : "hover:bg-muted/50"
                  }
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <CurrencyFlag ticker={item.ticker} className="w-5 h-4" />
                      <span>{item.currency}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    {item.ticker}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.tt_buy)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.tt_sell)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.bill_buy)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.bill_sell)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.ftc_buy)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.ftc_sell)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.cn_buy)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatValue(item.cn_sell)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
