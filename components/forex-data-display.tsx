"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ForexTable } from "./forex-table";
import { ForexDataByCategory } from "@/types/api";

interface ForexDataDisplayProps {
  data: ForexDataByCategory;
  isLoading: boolean;
  selectedDate: Date | undefined;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ForexDataDisplay({
  data,
  isLoading,
  selectedDate,
  searchTerm,
  onSearchChange,
}: ForexDataDisplayProps) {
  const categories = Object.keys(data) as Array<keyof ForexDataByCategory>;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading forex data...</p>
        </div>
      </div>
    );
  }

  if (!selectedDate) {
    return (
      <div className="flex justify-center">
        <Alert className="w-fit">
          <AlertDescription className="text-center">
            Please select a date to view forex rates.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex justify-center">
        <Alert className="w-fit">
          <AlertDescription className="text-center">
            No forex data available for the selected date.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (categories.length === 1) {
    const category = categories[0];
    const categoryData = data[category];

    if (!categoryData || categoryData.length === 0) {
      return (
        <div className="flex justify-center">
          <Alert className="w-fit">
            <AlertDescription className="text-center">
              No forex data available for the selected date.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <ForexTable
          data={categoryData}
          category={category}
          searchTerm={searchTerm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-sm px-4 py-2"
            >
              {category === "below_10"
                ? "Txns Below ₹10 Lakhs"
                : "Txns Between ₹10-20 Lakhs"}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const categoryData = data[category];
          return (
            <TabsContent key={category} value={category} className="mt-2">
              {categoryData && categoryData.length > 0 ? (
                <ForexTable
                  data={categoryData}
                  category={category}
                  searchTerm={searchTerm}
                />
              ) : (
                <div className="flex justify-center">
                  <Alert className="w-fit">
                    <AlertDescription className="text-center">
                      No data available for this category.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
