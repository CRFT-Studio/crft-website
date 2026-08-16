import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { fetchLookupSection } from "@/lib/lookup/client";
import { collectDefaultCollapsed, toFlowElements, transformToHierarchy } from "./hierarchy";
import { SitemapNode } from "./SitemapNode";
import { SitemapToolbar } from "./SitemapToolbar";
import type { SitemapResponse, SitemapTreeNode } from "./types";
import "@xyflow/react/dist/style.css";
import "./sitemap.css";

const nodeTypes = { sitemap: SitemapNode };

type SitemapCanvasProps = {
  url: string;
};

function StatusMessage({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return (
    <div
      className={`flex h-[720px] items-center justify-center p-4 text-center ${
        error ? "flex-col text-red-400" : "text-neutral-300"
      }`}
    >
      {children}
    </div>
  );
}

function SitemapFlow({
  tree,
  totalUrls,
  expanded,
  query,
  onQueryChange,
  matchIndex,
  onMatchIndexChange,
  collapsedIds,
  onToggle,
  onToggleExpand,
}: {
  tree: SitemapTreeNode;
  totalUrls: number;
  expanded: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  matchIndex: number;
  onMatchIndexChange: (index: number) => void;
  collapsedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleExpand: () => void;
}) {
  const { fitView } = useReactFlow();

  const { nodes, edges, stats, matchIds } = useMemo(
    () => toFlowElements(tree, { collapsedIds, query, totalUrls, onToggle }),
    [tree, collapsedIds, query, totalUrls, onToggle],
  );
  const matchKey = matchIds.join("\0");

  const focusNode = useCallback(
    (id: string) => {
      requestAnimationFrame(() => {
        fitView({ nodes: [{ id }], padding: 0.45, duration: 400 });
      });
    },
    [fitView],
  );

  useEffect(() => {
    onMatchIndexChange(0);
    const first = matchKey.split("\0")[0];
    if (query.trim() && first) focusNode(first);
  }, [query, matchKey, focusNode, onMatchIndexChange]);

  return (
    <ReactFlow
      className="sitemap-flow"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      colorMode="dark"
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      panOnScroll
      zoomOnDoubleClick={false}
      minZoom={0.08}
      maxZoom={2}
      onlyRenderVisibleElements
      onInit={(instance) => instance.fitView({ padding: 0.18 })}
      proOptions={{ hideAttribution: false }}
      deleteKeyCode={null}
    >
      <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#404040" />
      <Controls showInteractive={false} />
      {expanded && (
        <MiniMap
          pannable
          zoomable
          maskColor="rgba(0,0,0,0.45)"
          nodeColor="#f97316"
        />
      )}
      <Panel position="top-left" className="pointer-events-none !m-0 !w-full !p-0">
        <SitemapToolbar
          query={query}
          onQueryChange={onQueryChange}
          stats={stats}
          matchIds={matchIds}
          matchIndex={matchIndex}
          onMatchIndexChange={onMatchIndexChange}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          onFitFirstMatch={focusNode}
        />
      </Panel>
    </ReactFlow>
  );
}

export default function SitemapCanvas({ url }: SitemapCanvasProps) {
  const [tree, setTree] = useState<SitemapTreeNode | null>(null);
  const [totalUrls, setTotalUrls] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [matchIndex, setMatchIndex] = useState(0);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  const onToggle = useCallback((id: string) => {
    setCollapsedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!url) {
        setLoading(false);
        setEmpty(true);
        return;
      }

      try {
        const result = await fetchLookupSection<SitemapResponse>("sitemap", url);
        if (cancelled) return;
        if (result.error && !result.urls?.length) {
          setError(result.error);
          setLoading(false);
          return;
        }
        if (!result.urls?.length) {
          setEmpty(true);
          setLoading(false);
          return;
        }
        const origin = new URL(url).origin;
        const nextTree = transformToHierarchy(result.urls, origin);
        setTree(nextTree);
        setCollapsedIds(collectDefaultCollapsed(nextTree));
        setTotalUrls(result.urls.length);
        setLoading(false);
      } catch {
        if (cancelled) return;
        setError("Failed to access site");
        setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  if (loading) {
    return <StatusMessage>Fetching sitemap...</StatusMessage>;
  }

  if (empty) {
    return <StatusMessage>No sitemap found or sitemap is empty</StatusMessage>;
  }

  if (error || !tree) {
    return (
      <StatusMessage error>
        <span className="mb-2 font-semibold">Unable to fetch sitemap</span>
        <span>{error || "Failed to access site"}</span>
      </StatusMessage>
    );
  }

  const flow = (
    <ReactFlowProvider>
      <SitemapFlow
        tree={tree}
        totalUrls={totalUrls}
        expanded={expanded}
        query={query}
        onQueryChange={setQuery}
        matchIndex={matchIndex}
        onMatchIndexChange={setMatchIndex}
        collapsedIds={collapsedIds}
        onToggle={onToggle}
        onToggleExpand={() => setExpanded((value) => !value)}
      />
    </ReactFlowProvider>
  );

  return (
    <div className="relative h-[720px] w-full bg-[#1c1c1c]">
      {expanded
        ? createPortal(
            <div className="fixed inset-0 z-[80] bg-[#1c1c1c]">{flow}</div>,
            document.body,
          )
        : <div className="absolute inset-0">{flow}</div>}
    </div>
  );
}
