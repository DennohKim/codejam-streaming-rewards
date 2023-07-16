import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateAddr = (address?: string, separator: string = '…') => {
  if (!address) return '';

  const match = address.match(
    /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );

  if (!match) return address;
  return `${match[1]}${separator}${match[2]}`;
};
