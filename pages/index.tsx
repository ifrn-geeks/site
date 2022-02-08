import Head from "next/head"
import type { GetStaticProps, NextPage } from "next"
import { getPaths, Path } from "../lib/content"
import { TopBar } from "../components/Topbar"

interface Props {
  firstClassePath: Path
  firstMemberPath: Path
}

const HomePage: NextPage<Props> = ({ firstClassePath, firstMemberPath }) => {
  return (
    <>
      <Head>
        <title>IFRN GEEKS</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
      </Head>
      <div className="flex flex-col h-screen">
        <TopBar firstClasse={firstClassePath.name} firstMember={firstMemberPath.name} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths = await getPaths()

  const firstClassePath = paths.find((path_) => path_.type == "aulas")!
  const firstMemberPath = paths.find((path_) => path_.type == "equipe")!

  return {
    props: {
      firstClassePath,
      firstMemberPath
    }
  }
}

export default HomePage
