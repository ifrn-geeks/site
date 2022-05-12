import Head from "next/head"
import type { GetStaticProps, NextPage } from "next"
import { getPaths, Path } from "../lib/content"
import { TopBar } from "../components/Topbar"
import { Sidebar } from "../components/Sidebar"
import { useRouter } from "next/router"

interface Props {
  paths: Path[]
  firstClassePath: Path
  firstMemberPath: Path
}

const HomePage: NextPage<Props> = ({ paths, firstClassePath, firstMemberPath }) => {
  const router = useRouter()

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
        <main className="w-full overflow-y-auto">
          <div className="flex flex-row">
            <h1 className="text-center text-3xl">IFRN GEEKS</h1>
            <img src="/images/IFRN Geeks.png" alt="Logo do Geeks" width={500} height={500} />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#289c41" fillOpacity="1" d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,154.7C672,171,768,181,864,170.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          <div style={{ backgroundColor: "#289c41" }}>
            <section id="sobre">
              <h1 className="text-center text-3xl">Sobre</h1>
            </section>
            <section id="historia">
              <h1 className="text-center text-3xl">História</h1>
            </section>
            <section id="equipe">
              <h1 className="text-center text-3xl">Equipe</h1>
            </section>
          </div>
        </main>
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
      paths,
      firstClassePath,
      firstMemberPath
    }
  }
}

export default HomePage
