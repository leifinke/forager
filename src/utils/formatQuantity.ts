export default function toFraction(n: number): string {
  const fractions: Record<number, string> = {
    0.25: "\u00BC",
    0.333: "\u2153",
    0.5: "\u00BD",
    0.667: "\u2154",
    0.75: "\u00BE",
    1.25: "1\u00BC",
    1.333: "1\u2153",
    1.5: "1\u00BD",
    1.667: "1\u2154",
    1.75: "1\u00BE",
  };
  const rounded = Math.round(n * 1000) / 1000;
  return fractions[rounded] ?? n.toString();
}