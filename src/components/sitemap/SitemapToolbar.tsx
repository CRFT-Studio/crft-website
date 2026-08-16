import { useReactFlow, getNodesBounds, getViewportForBounds } from "@xyflow/react";
import { toPng } from "html-to-image";
import { Download, Maximize2, Minimize2, RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import type { SitemapStats } from "./types";

const EXPORT_WIDTH = 1920;
const EXPORT_HEIGHT = 1080;

type SitemapToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  stats: SitemapStats;
  matchIds: string[];
  matchIndex: number;
  onMatchIndexChange: (index: number) => void;
  expanded: boolean;
  onToggleExpand: () => void;
  onFitFirstMatch: (id: string) => void;
};

function formatCount(value: number) {
  return value.toLocaleString();
}

export function SitemapToolbar({
  query,
  onQueryChange,
  stats,
  matchIds,
  matchIndex,
  onMatchIndexChange,
  expanded,
  onToggleExpand,
  onFitFirstMatch,
}: SitemapToolbarProps) {
  const { fitView, getNodes } = useReactFlow();
  const [exporting, setExporting] = useState(false);

  const cycleMatch = (direction: 1 | -1) => {
    if (matchIds.length === 0) return;
    const next = (matchIndex + direction + matchIds.length) % matchIds.length;
    onMatchIndexChange(next);
    onFitFirstMatch(matchIds[next]);
  };

  const exportPng = async () => {
    const viewport = document.querySelector(".sitemap-flow .react-flow__viewport");
    if (!(viewport instanceof HTMLElement)) return;

    setExporting(true);
    try {
      const bounds = getNodesBounds(getNodes());
      const view = getViewportForBounds(bounds, EXPORT_WIDTH, EXPORT_HEIGHT, 0.5, 2, 0.16);
      const dataUrl = await toPng(viewport, {
        backgroundColor: "#1c1c1c",
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        style: {
          width: `${EXPORT_WIDTH}px`,
          height: `${EXPORT_HEIGHT}px`,
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
        },
      });
      const link = document.createElement("a");
      link.download = "sitemap.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="pointer-events-none flex w-full flex-wrap items-start justify-between gap-2 p-3">
      <div className="pointer-events-auto flex flex-wrap items-center gap-2">
        <label className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                cycleMatch(event.shiftKey ? -1 : 1);
              }
            }}
            placeholder="Search pages"
            className="h-8 w-44 border border-neutral-600 bg-[#262626] pl-8 pr-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-400 sm:w-56"
          />
        </label>
        <div className="border border-neutral-600 bg-[#262626] px-2.5 py-1.5 text-xs text-neutral-300">
          {query
            ? `${formatCount(stats.matchCount)} match${stats.matchCount === 1 ? "" : "es"}`
            : `${formatCount(stats.totalUrls)} pages · ${formatCount(stats.folderCount)} folders`}
        </div>
        {matchIds.length > 1 && (
          <button
            type="button"
            className="h-8 border border-neutral-600 bg-[#262626] px-2 text-xs text-neutral-200 hover:bg-[#404040]"
            onClick={() => cycleMatch(1)}
          >
            {matchIndex + 1}/{matchIds.length}
          </button>
        )}
      </div>
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 border border-neutral-600 bg-[#262626] px-2.5 text-xs text-white hover:bg-[#404040]"
          onClick={() => fitView({ padding: 0.18, duration: 500 })}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
        {expanded && (
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 border border-neutral-600 bg-[#262626] px-2.5 text-xs text-white hover:bg-[#404040] disabled:opacity-50"
            onClick={exportPng}
            disabled={exporting}
          >
            <Download className="h-3.5 w-3.5" />
            {exporting ? "Exporting" : "PNG"}
          </button>
        )}
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 border border-neutral-600 bg-[#262626] px-2.5 text-xs text-white hover:bg-[#404040]"
          onClick={onToggleExpand}
        >
          {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          {expanded ? "Close" : "Expand"}
        </button>
      </div>
    </div>
  );
}
