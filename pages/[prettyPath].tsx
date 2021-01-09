import { GetStaticProps } from 'next'
import { getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import NotionPage, { NotionPageProps } from '../components/NotionPage'
import { hasPrettyNotionPath, notionPageIdToPrettyPagePath, prettyPagePathToNotionId } from '../constants/notion-paths'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps<PrettyPathPageProps, { prettyPath: string }> = async (context) => {
  const prettyPath = context.params?.prettyPath

  if (prettyPath) {
    const notionPageId = prettyPagePathToNotionId(prettyPath)
    const recordMap = await notion.getPage(notionPageId)

    return {
      props: {
        recordMap,
        prettyPath,
        notionPageId
      },
      revalidate: 10
    }
  } else {
    return {
      notFound: true
    }
  }
}

export async function getStaticPaths() {
  const rootNotionPageId = '3cb629505a8d49279fe8848e1d564deb'
  const rootNotionSpaceId = '3cb629505a8d49279fe8848e1d564deb'

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion)
  )

  const notionPageIds = Object.keys(pages)

  const paths = [
    ...notionPageIds.map(pageId => `/${pageId}`),
    ...notionPageIds.map(pageId => `/${notionPageIdToPrettyPagePath(pageId)}`)
  ]

  return {
    paths,
    fallback: true
  }
}

interface PrettyPathPageProps extends NotionPageProps {
  prettyPath: string;
  notionPageId: string;
}

export default function PrettyPathPage({ prettyPath, notionPageId, ...rest }: PrettyPathPageProps) {
  const router = useRouter()

  useEffect(() => {
    if (hasPrettyNotionPath(notionPageId)) {
      router.push(notionPageIdToPrettyPagePath(notionPageId))
    }
  })
  
  return (
    <NotionPage {...rest} />
  )
}