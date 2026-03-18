import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { fetchJson } from "../lib/api";
import type { CampaignCategory, CampaignSummary, DiscoverResponse } from "../lib/domain";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpDown, Filter, Search, Star, Bookmark } from "lucide-react";

type SortMode = "trending" | "closing" | "new" | "roi" | "ai";
type CategoryFilter = "all" | Lowercase<CampaignCategory>;

function clampPct(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

export function Marketplace() {
  const { config } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortMode>("trending");
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>("all");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);

  const canQuery = Boolean(config.apiBaseUrl);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!canQuery) {
        setCampaigns([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = new URL("/v1/discover", config.apiBaseUrl);
        const q = searchTerm.trim();
        if (q) url.searchParams.set("q", q);
        if (filterCategory !== "all") url.searchParams.set("category", filterCategory);
        url.searchParams.set("sort", sortBy);

        const data = await fetchJson<DiscoverResponse>(url.toString());
        if (cancelled) return;

        setCampaigns(Array.isArray(data.campaigns) ? data.campaigns : []);
      } catch (e) {
        if (cancelled) return;
        setCampaigns([]);
        setError(e instanceof Error ? e.message : "Failed to load discover feed.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [canQuery, config.apiBaseUrl, filterCategory, searchTerm, sortBy]);

  const visible = useMemo(() => campaigns, [campaigns]);

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2 font-bold tracking-tight">Discover</h1>
              <p className="text-sm text-muted-foreground">
                Live campaigns only. This UI will not invent markets.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/settings">Settings</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search talent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11"
              />
            </div>

            <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v as CategoryFilter)}>
              <SelectTrigger className="w-56">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortMode)}>
            <SelectTrigger className="w-64">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="closing">Closing Soon</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="roi">Highest ROI Potential</SelectItem>
              <SelectItem value="ai">AI Recommended</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {!canQuery && (
          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Connect your backend to load campaigns</div>
                <div className="text-sm text-muted-foreground">
                  Set <span className="font-mono">API base URL</span> in Settings, then reload this page.
                </div>
              </div>
              <Button asChild>
                <Link to="/settings">Open Settings</Link>
              </Button>
            </div>
          </Card>
        )}

        {error && (
          <Card className="mt-6 p-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Failed to load discover feed</div>
              <div className="text-sm text-muted-foreground break-words">{error}</div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.message("Retrying…");
                    setError(null);
                    setCampaigns((prev) => prev);
                  }}
                >
                  Retry
                </Button>
                <Button asChild>
                  <Link to="/settings">Check Settings</Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-48 w-full rounded-xl" />
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-2 w-full rounded-full" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-10 w-full rounded-full" />
                    <Skeleton className="h-10 w-12 rounded-full" />
                  </div>
                </div>
              </Card>
            ))}

          {!isLoading &&
            visible.map((c, index) => {
              const pct = c.targetAmountUsd > 0 ? clampPct((c.totalRaisedUsd / c.targetAmountUsd) * 100) : 0;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(0.25, index * 0.02) }}
                >
                  <Card className="p-6">
                    <div className="relative">
                      <ImageWithFallback
                        src={c.talentPhotoUrl ?? ""}
                        alt={c.talentName}
                        className="h-48 w-full rounded-xl object-cover"
                      />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge
                          className="border-[color:var(--border)] bg-[color:color-mix(in srgb, var(--accent) 15%, transparent)] text-[color:var(--text-primary)]"
                        >
                          {c.category}
                        </Badge>
                        <Badge
                          className="border-[color:var(--border)] bg-[color:color-mix(in srgb, var(--accent) 15%, transparent)] text-[color:var(--text-primary)]"
                        >
                          <Star className="h-3 w-3" />
                          {Math.round(c.starScore)}/100
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="space-y-1">
                        <div className="text-base font-semibold">{c.talentName}</div>
                        <div className="text-xs text-muted-foreground">
                          Min invest ${c.minInvestmentUsd.toFixed(0)} • {c.investorsCount} investors
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            ${c.totalRaisedUsd.toLocaleString()} / ${c.targetAmountUsd.toLocaleString()}
                          </span>
                          <span className="font-medium text-foreground">{pct.toFixed(0)}%</span>
                        </div>
                        <Progress value={pct} />
                      </div>

                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link to={`/talent/${encodeURIComponent(c.slug)}`}>Invest</Link>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toast.message("Watchlist is stored server-side. Connect backend to save.")}
                          aria-label="Save"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
        </div>

        {!isLoading && canQuery && !error && visible.length === 0 && (
          <Card className="mt-6 p-10 text-center">
            <div className="mx-auto max-w-xl space-y-2">
              <div className="text-sm font-medium">No campaigns found</div>
              <div className="text-sm text-muted-foreground">
                Your backend returned zero campaigns for this query.
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

