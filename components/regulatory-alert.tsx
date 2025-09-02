import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

export function RegulatoryAlert() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 my-2">
      {/* Regulatory Note Alert */}
      <Alert className="border-dashed flex-1 bg-muted/30">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm leading-relaxed">
          <strong className="text-foreground">
            Important Regulatory Note
          </strong>{" "}
          <span className="text-muted-foreground">
            According to{" "}
            <a
              href="https://incometaxindia.gov.in/pages/rules/income-tax-rules-1962.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Rule 115 of the Income-tax Rules, 1962
            </a>
            , foreign income and assets must be reported using the Telegraphic
            Transfer (TT) buying rate of the State Bank of India (SBI) for
            conversion into Indian Rupees. This prescribed rate is the official
            exchange rate for all income tax reporting related to foreign
            currency transactions.
          </span>
        </AlertDescription>
      </Alert>

      {/* Data Archive Warning Alert */}
      <Alert className="border-dashed flex-1 bg-muted/30">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-sm leading-relaxed">
          <strong className="text-foreground">Data Archive Notice</strong>{" "}
          <span className="text-muted-foreground">
            The SBI publishes these rates online for any given day. However, it
            does not maintain a historical archive of the rates. This website
            aims to independently maintain a historical archive of the official
            forex rates published daily by the SBI, from 1st January 2022
            onwards but provides no guarantees regarding the accuracy or
            completeness of the data.
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
}
