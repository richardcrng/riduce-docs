export const PRETTY_NOTION_PATHS: Record<string, string> = {
  '3cb629505a8d49279fe8848e1d564deb': '',
  'b8d02f1627694df7a205d722c06b7da9': 'getting-started',
  '65b55cae7f574b60a6e348871a1bdb59': 'core-api',
  'ee871777cdf14fc683dca24bd0227275': 'typescript'
}

export const REVERSE_NOTION_PATHS = Object.fromEntries(Object.entries(PRETTY_NOTION_PATHS).map(([notionPageId, prettyPath]) => [prettyPath, notionPageId]))

export const hasPrettyNotionPath = (notionPageId: string): boolean => {
  return Object.keys(PRETTY_NOTION_PATHS).includes(notionPageId)
}

export const notionPageIdToPrettyPagePath = (notionPageId: string): string => {
  return PRETTY_NOTION_PATHS[notionPageId] ?? notionPageId
}

export const prettyPagePathToNotionId = (pagePath: string): string => {
  return REVERSE_NOTION_PATHS[pagePath] ?? pagePath

  // throw new Error("Couldn't find Notion page id")
}