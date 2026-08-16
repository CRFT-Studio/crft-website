import { hierarchy, tree } from "d3-hierarchy";
import type {
  SitemapFlowEdge,
  SitemapFlowNode,
  SitemapStats,
  SitemapTreeNode,
} from "./types";

export const COLLAPSE_THRESHOLD = 10;
export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 56;
const H_GAP = 88;
const V_GAP = 28;

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function nodeMatches(node: SitemapTreeNode, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return (
    node.name.toLowerCase().includes(q) ||
    node.path.toLowerCase().includes(q) ||
    node.url.toLowerCase().includes(q)
  );
}

export function transformToHierarchy(urls: string[], baseUrl: string): SitemapTreeNode {
  const origin = new URL(baseUrl).origin;
  const root: SitemapTreeNode = {
    id: "/",
    name: origin.replace(/^https?:\/\//, ""),
    path: "/",
    url: origin,
    children: [],
    childCount: 0,
    collapsed: false,
    isRoot: true,
  };

  for (const raw of urls) {
    const path = raw.replace(/^https?:\/\/[^/]+/, "");
    const segments = path.split("/").filter(Boolean);
    let current = root;
    let acc = "";

    for (const segment of segments) {
      acc += `/${segment}`;
      let child = current.children.find((entry) => entry.name === decodeSegment(segment));
      if (!child) {
        child = {
          id: acc,
          name: decodeSegment(segment),
          path: acc,
          url: `${origin}${acc}`,
          children: [],
          childCount: 0,
          collapsed: false,
          isRoot: false,
        };
        current.children.push(child);
      }
      current = child;
    }
  }

  const process = (node: SitemapTreeNode) => {
    node.childCount = node.children.length;
    if (!node.isRoot && node.children.length > COLLAPSE_THRESHOLD) {
      node.collapsed = true;
    }
    node.children.forEach(process);
  };

  process(root);
  return root;
}

export function collectDefaultCollapsed(node: SitemapTreeNode, into = new Set<string>()) {
  if (node.collapsed) into.add(node.id);
  for (const child of node.children) collectDefaultCollapsed(child, into);
  return into;
}

export function collectMatchIds(node: SitemapTreeNode, query: string, into: string[] = []) {
  if (nodeMatches(node, query)) into.push(node.id);
  for (const child of node.children) collectMatchIds(child, query, into);
  return into;
}

function countFolders(node: SitemapTreeNode): number {
  const self = node.childCount > 0 ? 1 : 0;
  return self + node.children.reduce((sum, child) => sum + countFolders(child), 0);
}

function filterTree(
  node: SitemapTreeNode,
  collapsedIds: Set<string>,
  query: string,
): SitemapTreeNode | null {
  const q = query.trim();

  if (q) {
    const children = node.children
      .map((child) => filterTree(child, collapsedIds, query))
      .filter((child): child is SitemapTreeNode => child !== null);
    if (!nodeMatches(node, q) && children.length === 0) return null;
    return { ...node, collapsed: false, children };
  }

  const collapsed = collapsedIds.has(node.id);
  if (collapsed) {
    return { ...node, collapsed: true, children: [] };
  }

  const children = node.children
    .map((child) => filterTree(child, collapsedIds, query))
    .filter((child): child is SitemapTreeNode => child !== null);

  return { ...node, collapsed: false, children };
}

export function toFlowElements(
  root: SitemapTreeNode,
  options: {
    collapsedIds: Set<string>;
    query: string;
    totalUrls: number;
    onToggle: (id: string) => void;
  },
): {
  nodes: SitemapFlowNode[];
  edges: SitemapFlowEdge[];
  stats: SitemapStats;
  matchIds: string[];
} {
  const query = options.query.trim();
  const matchIds = query ? collectMatchIds(root, query) : [];
  const visible = filterTree(root, options.collapsedIds, query);

  if (!visible) {
    return {
      nodes: [],
      edges: [],
      matchIds,
      stats: {
        totalUrls: options.totalUrls,
        folderCount: countFolders(root),
        visibleNodes: 0,
        matchCount: matchIds.length,
      },
    };
  }

  const layoutRoot = hierarchy(visible);
  tree<SitemapTreeNode>().nodeSize([NODE_HEIGHT + V_GAP, NODE_WIDTH + H_GAP])(layoutRoot);

  const nodes: SitemapFlowNode[] = [];
  const edges: SitemapFlowEdge[] = [];

  layoutRoot.each((d) => {
    const collapsed = !query && options.collapsedIds.has(d.data.id);
    nodes.push({
      id: d.data.id,
      type: "sitemap",
      position: { x: d.y, y: d.x - NODE_HEIGHT / 2 },
      data: {
        label: d.data.name,
        url: d.data.url,
        path: d.data.path,
        childCount: d.data.childCount,
        collapsed,
        isRoot: d.data.isRoot,
        isLeaf: d.data.childCount === 0,
        match: query ? nodeMatches(d.data, query) : false,
        onToggle: options.onToggle,
      },
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });

    if (d.parent) {
      edges.push({
        id: `${d.parent.data.id}->${d.data.id}`,
        source: d.parent.data.id,
        target: d.data.id,
        focusable: false,
        style: { stroke: "rgba(255,255,255,0.35)", strokeWidth: 1.5 },
      });
    }
  });

  return {
    nodes,
    edges,
    matchIds,
    stats: {
      totalUrls: options.totalUrls,
      folderCount: countFolders(root),
      visibleNodes: nodes.length,
      matchCount: matchIds.length,
    },
  };
}
