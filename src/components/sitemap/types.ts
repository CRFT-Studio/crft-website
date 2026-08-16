import type { Edge, Node } from "@xyflow/react";

export type SitemapTreeNode = {
  id: string;
  name: string;
  path: string;
  url: string;
  children: SitemapTreeNode[];
  childCount: number;
  collapsed: boolean;
  isRoot: boolean;
};

export type SitemapNodeData = {
  label: string;
  url: string;
  path: string;
  childCount: number;
  collapsed: boolean;
  isRoot: boolean;
  isLeaf: boolean;
  match: boolean;
  onToggle: (id: string) => void;
};

export type SitemapFlowNode = Node<SitemapNodeData, "sitemap">;
export type SitemapFlowEdge = Edge;

export type SitemapStats = {
  totalUrls: number;
  folderCount: number;
  visibleNodes: number;
  matchCount: number;
};

export type SitemapResponse = {
  urls: string[];
  error: string | null;
};
