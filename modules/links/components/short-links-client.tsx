"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, ExternalLink, Trash2, QrCode, Download, Filter, Search, BarChart3 } from "lucide-react";
import { ShortLinkHitsChart } from "./shortlink-hits-chart";
import { getShortLinkDailyHits } from "../actions/shortlink-analytics";
import { deleteShortLink, deleteMultipleShortLinks } from "../actions";
import { toast } from "sonner";

interface ShortLinkItem {
  id: string;
  shortCode: string;
  url: string;
  clicks: number;
  createdAt: string;
}

interface Props {
  links: ShortLinkItem[];
}

export function ShortLinksClient({ links }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return links.filter(l =>
      l.shortCode.toLowerCase().includes(query.toLowerCase()) ||
      l.url.toLowerCase().includes(query.toLowerCase())
    );
  }, [links, query]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const allSelected = selected.size === filtered.length && filtered.length > 0;
  const toggleSelectAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(l => l.id)));
  };

  const handleCopy = (code: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
    const full = `${origin}/l/${code}`;
    navigator.clipboard.writeText(full).then(() => toast.success("Copied short URL"));
  };

  const handleDelete = async (id: string) => {
    setLoadingIds(prev => new Set(prev).add(id));
    const res = await deleteShortLink(id);
    if (!res.success) toast.error(res.error || "Failed to delete");
    else toast.success("Deleted short link");
    setLoadingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    const res = await deleteMultipleShortLinks(ids);
    if (!res.success) toast.error(res.error || "Bulk delete failed");
    else toast.success("Deleted selected links");
    setSelected(new Set());
  };

  const exportCSV = () => {
    const rows = ["shortCode,url,clicks,createdAt"].concat(
      filtered.map(l => `${l.shortCode},${l.url},${l.clicks},${l.createdAt}`)
    );
    const blob = new Blob([rows.join("\n")], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'short-links.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const avgClicksPerDay = (l: ShortLinkItem) => {
    const days = Math.max(1, (Date.now() - new Date(l.createdAt).getTime()) / 86400000);
    return l.clicks / days;
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search short links..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          {selected.size > 0 && (
            <Badge className="bg-blue-600 text-white">{selected.size} selected</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV} className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          {selected.size > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="gap-2">
              <Trash2 className="h-4 w-4" /> Delete Selected
            </Button>
          )}
        </div>
      </div>

      <Card className="p-4 border-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
            <span className="text-sm font-medium">Short Links ({filtered.length})</span>
          </div>
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {links.length}</span>
        </div>
        <div className="space-y-3">
          {filtered.map(l => {
            const avg = avgClicksPerDay(l);
            const performanceWidth = Math.min(100, Math.round((avg / 10) * 100));
            const perfClass = performanceWidth >= 90 ? 'w-[90%]' : performanceWidth >= 80 ? 'w-[80%]' : performanceWidth >= 70 ? 'w-[70%]' : performanceWidth >= 60 ? 'w-[60%]' : performanceWidth >= 50 ? 'w-[50%]' : performanceWidth >= 40 ? 'w-[40%]' : performanceWidth >= 30 ? 'w-[30%]' : performanceWidth >= 20 ? 'w-[20%]' : performanceWidth >= 10 ? 'w-[10%]' : 'w-[5%]';
            return (
              <div key={l.id} className="group rounded-xl border bg-card/60 backdrop-blur px-4 py-3 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <Checkbox checked={selected.has(l.id)} onCheckedChange={() => toggleSelect(l.id)} />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">/{l.shortCode}</code>
                      <Badge variant="outline" className="gap-1">
                        <BarChart3 className="h-3.5 w-3.5" /> {l.clicks} clicks
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(l.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>
                      <span>•</span>
                      <span className="truncate">{l.url}</span>
                    </div>
                    {/* Performance bar */}
                    <div className="h-2 w-full rounded bg-muted overflow-hidden">
                      <div className={`h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all ${perfClass}`} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleCopy(l.shortCode)} title="Copy short URL">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" title="View hits chart">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Traffic Trend /{l.shortCode}</DialogTitle>
                        </DialogHeader>
                        {/* Server-fetched chart data via Suspense boundary */}
                        <AsyncHits shortLinkId={l.id} shortCode={l.shortCode} />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" title="QR Code">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-xs">
                        <DialogHeader>
                          <DialogTitle>QR Code</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-3">
                          <img
                            alt="QR code"
                            className="rounded-lg border"
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent((typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com') + '/l/' + l.shortCode)}`}
                          />
                          <code className="text-xs truncate w-full text-center">/{l.shortCode}</code>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" asChild title="Open destination URL" aria-label="Open destination URL">
                      <a href={l.url} target="_blank" rel="noreferrer" aria-label={`Open ${l.shortCode} destination`} title="Open destination URL">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open destination</span>
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      title="Delete"
                      disabled={loadingIds.has(l.id)}
                      onClick={() => handleDelete(l.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No short links match your search.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

// Async server data wrapper (RSC inside client via fetch action)
function AsyncHits({ shortLinkId, shortCode }: { shortLinkId: string; shortCode: string }) {
  // Using a simple promise to fetch server data on demand
  // In a real setup we might convert this into a separate server component.
  const [data, setData] = React.useState<Array<{ date: string; hits: number }> | null>(null);
  React.useEffect(() => {
    let mounted = true;
    getShortLinkDailyHits(shortLinkId, 30).then(d => { if (mounted) setData(d); });
    return () => { mounted = false; };
  }, [shortLinkId]);
  if (!data) return <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>;
  return <ShortLinkHitsChart data={data} shortCode={shortCode} />;
}
