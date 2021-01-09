import { GetStaticProps } from 'next'
import { getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import NotionPage, { NotionPageProps } from '../components/NotionPage'

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps<NotionPageProps, { notionPageId: string }> = async (context) => {
  const pageId = context.params?.notionPageId

  if (pageId) {
    const recordMap = await notion.getPage(pageId)

    return {
      props: {
        recordMap
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

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`)

  return {
    paths,
    fallback: true
  }
}

export default function GeneralPage(props: NotionPageProps) {
  
  return (
    <NotionPage {...props} />
  )
}