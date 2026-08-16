import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SitemapFlowNode } from "./types";

export function SitemapNode({ id, data, selected }: NodeProps<SitemapFlowNode>) {
  const expandable = data.childCount > 0 && !data.isRoot;

  return (
    <div
      className={cn(
        "group flex h-14 w-[200px] items-center gap-2 border bg-[#262626] px-2.5 text-white",
        selected || data.match ? "border-orange-400" : "border-neutral-600",
        expandable && "cursor-pointer",
      )}
      onClick={() => {
        if (expandable) data.onToggle(id);
      }}
      title={data.url}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-orange-500 !opacity-0" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white bg-orange-500" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] leading-tight">{data.label}</div>
        {data.childCount > 0 && (
          <div className="mt-0.5 text-[11px] leading-tight text-neutral-400">
            {data.childCount} {data.childCount === 1 ? "item" : "items"}
          </div>
        )}
      </div>
      {expandable && (
        data.collapsed
          ? <ChevronRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
          : <ChevronDown className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
      )}
      <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="nodrag nopan shrink-0 p-0.5 text-neutral-500 opacity-0 transition hover:text-orange-300 group-hover:opacity-100"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Open ${data.url}`}
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-orange-500 !opacity-0" />
    </div>
  );
}
