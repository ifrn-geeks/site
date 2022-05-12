import Link from "next/link"
import { Path } from "../lib/content"
import classNames from "classnames"
import { SideBarContext } from "../lib/context"
import { useContext } from "react"

interface Props {
  pages: Path[]
  currentPath: string
}

export const Sidebar = ({ pages, currentPath }: Props) => {
  const classes = pages.filter((page) => page.type == "aulas")
  const team = pages.filter((page) => page.type == "equipe")
  const { isOpen } = useContext(SideBarContext)

  return (
    <aside className={classNames("z-50 w-3/4 md:w-1/4 absolute inset-y-0 left-0 top-0 transform transition duration-200 ease-in-out lg:sticky p-5 border-r-2 md:transform-none dark:bg-gray-700 overflow-y-auto bg-white", {
      "-translate-x-full": !isOpen
    })}>
      <nav>
        <Link href="/">
          <a className="text-lg mb-1 font-bold">Home</a>
        </Link>
        <p className="text-lg mt-2 mb-1 font-bold">Aulas</p>
        <ul>
          {classes.map((page) => {
            return (
              <li key={page.path}>
                  <Link href={page.path}>
                    <a className={classNames({ "font-medium": currentPath.includes(page.path) })}>Aula {page.frontMatter.número}</a>
                  </Link>
                </li>
              )
          })}
        </ul>
        <p className="text-lg mt-2 mb-1 font-bold">Equipe</p>
        <ul>
          {team.map((page) => {
            return (
              <li key={page.path}>
                  <Link href={page.path}>
                    <a className={classNames({ "font-medium": currentPath.endsWith(page.path) })}>{page.frontMatter.nome}</a>
                  </Link>
                </li>
              )
          })}
        </ul>
      </nav>
    </aside>
  )
}
