import React from "react";
import * as CountryFlags from "country-flag-icons/react/3x2";

const CountryMap: Record<string, string> = {
  USD: "US",
  EUR: "LU",
  JPY: "JP",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  CNY: "CN",
  SEK: "SE",
  NZD: "NZ",
  AED: "AE",
  BDT: "BD",
  BHD: "BH",
  CHF: "CH",
  DKK: "DK",
  HKD: "HK",
  KES: "KE",
  KRW: "KR",
  KWD: "KW",
  LKR: "LK",
  MYR: "MY",
  NOK: "NO",
  OMR: "OM",
  PKR: "PK",
  QAR: "QA",
  RUB: "RU",
  SAR: "SA",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  ZAR: "ZA",
};

// Get country code for a currency ticker
export const getCountryCode = (ticker: string): string | null => {
  return CountryMap[ticker] || null;
};

// Flag component using country-flag-icons
export const CurrencyFlag: React.FC<{ ticker: string; className?: string }> = ({
  ticker,
  className = "w-5 h-4",
}) => {
  const countryCode = getCountryCode(ticker);

  if (!countryCode) {
    return (
      <div
        className={`${className} bg-gray-200 rounded-sm flex items-center justify-center`}
      >
        <span className="text-xs text-gray-500">?</span>
      </div>
    );
  }

  // Get the flag component from the imported flags
  const FlagComponent = (CountryFlags as any)[countryCode];

  if (FlagComponent) {
    return (
      <FlagComponent
        className={`${className} rounded-sm`}
        title={`${ticker} flag`}
      />
    );
  }

  // Fallback if flag component doesn't exist
  return (
    <div
      className={`${className} bg-gray-200 rounded-xs flex items-center justify-center`}
    >
      <span className="text-xs text-gray-500">?</span>
    </div>
  );
};

export default CountryMap;
