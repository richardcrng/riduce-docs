const PRETTY_NOTION_PATHS = require('./constants/pretty-paths.json');

module.exports = {
  async redirects() {

    return Object.entries(PRETTY_NOTION_PATHS).map(([notionPageId, prettyPath]) => ({
      source: `/${notionPageId}`,
      destination: `/${prettyPath}`,
      permanent: false
    }))
  },
}