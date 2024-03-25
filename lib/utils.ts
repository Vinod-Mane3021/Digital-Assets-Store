import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertStringToNumber = (value: string | number) => {
  if (typeof value === "string") {
    return parseFloat(value);
  }
  return value;
};

export const formatePrice = (
  price: number | string,
  options: {
    currency?: "USD" | "INR" | "EUR" | "GBP" | "BDT";
    notations?: Intl.NumberFormatOptions["notation"];
  } = {}
) => {
  const { currency = "USD", notations = "compact" } = options;
  const numericPrise = convertStringToNumber(price);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: notations,
    maximumFractionDigits: 2,
  }).format(numericPrise);
};
