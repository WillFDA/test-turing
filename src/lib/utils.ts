import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value)
}

export function formatDecimal(value: number, decimals = 2): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${formatDecimal(value, 2)}%`
}

export function formatCompactNumber(value: number): string {
  if (value >= 1000000) {
    return `${formatDecimal(value / 1000000, 1)}M`
  }
  if (value >= 1000) {
    return `${formatDecimal(value / 1000, 1)}K`
  }
  return formatNumber(value)
}
