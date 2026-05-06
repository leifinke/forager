export default function toFraction(n: number): string {
  const fractions: Record<number, string> = {
    0.25: "\u00BC",
    0.333: "\u2153",
    0.5: "\u00BD",
    0.667: "\u2154",
    0.75: "\u00BE",
  };
  const rounded = Math.round(n * 1000) / 1000;
  return fractions[rounded] ?? n.toString();
}