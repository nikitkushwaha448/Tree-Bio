"use server";
import { db } from "@/lib/db";

export async function getShortLinkDailyHits(shortLinkId: string, days: number = 30) {
  const since = new Date(Date.now() - days * 86400000);
  const hits = await db.shortLinkHit.findMany({
    where: { shortLinkId, hitAt: { gte: since } },
    select: { hitAt: true }
  });

  // Bucket by day
  const buckets: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    buckets[key] = 0;
  }
  hits.forEach(h => {
    const key = h.hitAt.toISOString().slice(0, 10);
    if (key in buckets) buckets[key]++;
  });

  // Convert to ordered array (oldest first)
  const data = Object.keys(buckets)
    .sort()
    .map(date => ({ date, hits: buckets[date] }));

  return data;
}
