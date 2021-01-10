import { GetStaticProps } from "next";
import { NotionAPI } from "notion-client";
import NotionPage, { NotionPageProps } from "../components/NotionPage";

const notion = new NotionAPI();

export const getStaticProps: GetStaticProps<NotionPageProps> = async () => {
  const pageId = "3cb629505a8d49279fe8848e1d564deb";

  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
  };
};

export default function Home(props: NotionPageProps) {
  return <NotionPage {...props} />;
}
