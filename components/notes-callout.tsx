import { Alert, AlertDescription } from "@/components/ui/alert";
import { NotebookPen } from "lucide-react";
import { ForexDataByCategory } from "@/types/api";

interface NotesCalloutProps {
  data: ForexDataByCategory;
}

export function NotesCallout({ data }: NotesCalloutProps) {
  const hasBelow10Category =
    "below_10" in data && data.below_10 && data.below_10.length > 0;

  return (
    <Alert className="border-dashed">
      <NotebookPen className="h-4 w-4" />
      <AlertDescription className="text-sm leading-relaxed">
        <strong className="text-foreground">Notes</strong>{" "}
        <div className="text-muted-foreground space-y-1">
          {!hasBelow10Category && (
            <div>
              • For transactions of value less than Rs 10 lakhs, please contact
              the nearest branch of SBI.
            </div>
          )}
          <div>
            • For transactions of value more than Rs 20 lakhs, please contact
            Forex handling branch of SBI.
          </div>
          <div>
            • JAPANESE YEN (JPY), INDONESIAN RUPIAH (IDR), THAI BAHT (THB) & KOREAN WON (KRW) are quoted
            in terms of 100 fc units.
          </div>
          <div>
            • Card rates mentioned above are indicative and are subject to
            change based on market volatility. The final rates applicable will
            be the card rates prevailing at the time of debit/credit to customer
            account.
          </div>
          <div>
            • The rates of Korean Won (KRW) and Turkish Lira (TRY) are for
            publication purpose only.
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
