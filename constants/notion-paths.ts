import { useRouter } from "next/router";
import PRETTY_NOTION_PATHS from "./pretty-paths.json";

export const REVERSE_NOTION_PATHS = Object.fromEntries(
  Object.entries(PRETTY_NOTION_PATHS).map(([notionPageId, prettyPath]) => [
    prettyPath,
    notionPageId,
  ])
);

export const hasPrettyNotionPath = (notionPageId: string): boolean => {
  return Object.keys(PRETTY_NOTION_PATHS).includes(notionPageId);
};

export const notionPageIdToPrettyPagePath = (notionPageId: string): string => {
  return PRETTY_NOTION_PATHS[notionPageId] ?? notionPageId;
};

export const prettyPagePathToNotionId = (pagePath: string): string => {
  return REVERSE_NOTION_PATHS[pagePath] ?? pagePath;

  // throw new Error("Couldn't find Notion page id")
};
