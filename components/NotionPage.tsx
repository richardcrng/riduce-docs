import Head from "next/head"
import { ExtendedRecordMap } from "notion-types"
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'

export interface NotionPageProps {
  recordMap: ExtendedRecordMap
  render?(renderedNotion: JSX.Element, props: Omit<NotionPageProps, 'render'>): JSX.Element
}

export default function NotionPage({
  render = (renderedNotion) => renderedNotion,
  ...rest
}: NotionPageProps) {
  const { recordMap } = rest

  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)

  const renderedNotion = (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </>
  )

  return render(renderedNotion, rest)
}