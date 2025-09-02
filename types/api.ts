export interface ForexRateResponse {
  id: number;
  currency: string;
  ticker: string;
  tt_buy: number;
  tt_sell: number;
  bill_buy: number;
  bill_sell: number;
  ftc_buy: number;
  ftc_sell: number;
  cn_buy: number;
  cn_sell: number;
  date: string;
  category: "below_10" | "10_to_20";
}

export interface StandardResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface DateAvailabilityResponse {
  success: boolean;
  data: string[]; // List of available dates in DD-MM-YYYY format
  message?: string;
}

export type ForexDataByCategory = {
  [key in "below_10" | "10_to_20"]?: ForexRateResponse[];
};
