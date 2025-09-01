import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-12">
      <div className="container mx-auto px-4 py-8">
        <Alert className="border-dashed">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong>{" "}
            <span className="text-muted-foreground">
              This website is not associated with the State Bank of India or any
              of its subsidiaries in any way whatsoever. While critical efforts
              are undertaken to ensure that the information presented on this
              website is collated from SBI accurately, it is provided on an "as
              is" basis, without any warranties as to fitness for any particular
              purpose, or with respect to the results which may be obtained from
              the use of such information and without any warranties of any kind
              whatsoever, express or implied.
            </span>
          </AlertDescription>
        </Alert>
      </div>
    </footer>
  );
}
