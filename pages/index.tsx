import Head from "next/head"
import type { GetStaticProps, NextPage } from "next"
import { getPaths, Path } from "../lib/content"

interface Props {
  paths: Path[]
}

const HomePage: NextPage = () => {
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
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths = await getPaths()

  const firstClassePath = paths.find((path_) => path_.type == "aulas")!
  const firstMemberPath = paths.find((path_) => path_.type == "equipe")!

  return {
    props: {
      paths
    }
  }
}

export default HomePage
