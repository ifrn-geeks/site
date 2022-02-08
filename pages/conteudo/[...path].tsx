import type { NextPage, GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { ParsedUrlQuery } from "querystring"
import { Sidebar } from "../../components/Sidebar"
import { getPaths, getPathContent, Path } from "../../lib/content"
import { ClassePage } from "../../components/ClassePage"
import { TeamPage } from "../../components/TeamPage"
import { useRouter } from "next/router"
import { TopBar } from "../../components/Topbar"
import { TableOfContents } from "../../components/TableOfContents"
import { useContext } from "react"
import { SideBarContext } from "../../lib/context"
import { renderToString } from "react-dom/server"
import { components } from "../../components/MdxComponents"
import cheerio from "cheerio"

interface Props {
  source: MDXRemoteSerializeResult
  frontMatter: any | {
    title: string
  } | {
    title: string
  }
  paths: Path[]
  currentPath: Path | undefined
  toc: {
    link: string
    text: string
    level: number
  }[]
  firstClassePath: Path
  firstMemberPath: Path
}

interface Params extends ParsedUrlQuery {
  path: string[]
}

const ContentPage: NextPage<Props> = ({ source, paths, currentPath, toc, firstClassePath, firstMemberPath }) => {
  const router = useRouter()

  const { isOpen, setIsOpen } = useContext(SideBarContext)

  const closeSideBar = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar firstClasse={firstClassePath.name} firstMember={firstMemberPath.name} />
      <div className="flex w-full h-screen pt-12">
        <Sidebar pages={paths} currentPath={router.asPath} />
        <main className="py-10 w-full overflow-y-auto p-5">
          {
            currentPath!.type === "aulas" ?
              <ClassePage source={source} frontMatter={currentPath!.frontMatter} /> :
              <TeamPage source={source} frontMatter={currentPath!.frontMatter} />
          }
        </main>
        <TableOfContents toc={toc} type={currentPath!.type} />
      </div>
      {
        isOpen && <div className="fixed w-screen h-screen bg-black opacity-50" onClick={closeSideBar}></div>
      }
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async (context) => {
  const paths = await getPaths()

  return { paths: paths.map((path) => { return { params: { path: [path.type, path.name] } } }), fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const path = params?.path![0] + "/" + params?.path![1]
  const { content, frontMatter } = await getPathContent(path)
  const mdxSource = await serialize(content)
  const paths = await getPaths()
  const currentPath = paths.find((path_) => path_.path == path)

  const contextText = renderToString(<MDXRemote {...mdxSource} components={components} />)

  const $ = cheerio.load(contextText)

  const toc = $("h1, h2, h3, h4, h5, h6").map((_, el) => {
    const $el = $(el)
    const link = $el.attr("id")!
    const text = $el.text()
    const level = Number($el.prop("tagName")[1])

    return { link, text, level }
  }).get()

  const firstClassePath = paths.find((path_) => path_.type == "aulas")!
  const firstMemberPath = paths.find((path_) => path_.type == "equipe")!

  return {
    props: {
      source: mdxSource,
      frontMatter,
      paths,
      currentPath,
      toc,
      firstClassePath,
      firstMemberPath
    }
  }
}

export default ContentPage
