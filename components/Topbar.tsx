import Link from "next/link"
import { useContext } from "react"
import { SideBarContext } from "../lib/context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { useTheme } from "next-themes"

interface Props {
  firstClasse: string
  firstMember: string
}

export const TopBar = ({ firstClasse, firstMember }: Props) => {
  const { isOpen, setIsOpen } = useContext(SideBarContext)
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full h-12 border-b-2 absolute px-5">
      <div className="h-12 flex">
        <div className="justify-between items-center">
          <button className="lg:hidden  flex items-center justify-center h-full p-2 text-2xl text-white bg-blue-500 hover:bg-blue-700 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <Link href="/">
          <a>IFRN GEEKS</a>
        </Link>
        <div className="w-full flex items-center justify-end">
          <nav className="flex mr-20">
            <Link href="/">
              <a className="mx-2">Home</a>
            </Link>
            <Link href={`/conteudo/aulas/${firstClasse}`}>
              <a className="mx-2">Aulas</a>
            </Link>
            <Link href={`/conteudo/equipe/${firstMember}`}>
              <a className="mx-2">Equipe</a>
            </Link>
          </nav>
          <button>
            {
              theme === "light" ?
                <FontAwesomeIcon icon={faSun} onClick={() => setTheme("dark")} /> :
                <FontAwesomeIcon icon={faMoon} onClick={() => setTheme("light")} />
            }
          </button>
        </div>
      </div>
    </header>
  )
}
