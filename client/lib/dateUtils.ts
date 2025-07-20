import { Timestamp } from "firebase/firestore";

/**
 * Convertit différents types de dates en objet Date
 */
export function parseDate(rawDate: any): Date {
  if (!rawDate) return new Date(0);
  if (rawDate instanceof Timestamp) return rawDate.toDate();
  if (
    typeof rawDate === "object" &&
    rawDate !== null &&
    "toDate" in rawDate &&
    typeof rawDate.toDate === "function"
  ) {
    return rawDate.toDate();
  }
  const parsed = new Date(rawDate);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

/**
 * Formate une date timestamp pour l'affichage
 */
export function formatDate(timestamp: any): string {
  if (!timestamp) return "Date non définie";

  const date = parseDate(timestamp);

  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formate l'heure d'un timestamp pour l'affichage
 */
export function formatTime(timestamp: any): string {
  if (!timestamp) return "Heure non définie";

  const date = parseDate(timestamp);

  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
