import Link from "next/link"
import { useContext } from "react"
import { SideBarContext } from "../lib/context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"

interface Props {
  firstClasse: string
  firstMember: string
}

export const TopBar = ({ firstClasse, firstMember }: Props) => {
  const { isOpen, setIsOpen } = useContext(SideBarContext)

  return (
    <header className="w-full h-12 border-b-2 absolute px-5 bg-white">
      <div className="h-12 flex">
        <div className="justify-between items-center -ml-5">
          <button className="lg:hidden flex items-center justify-center h-full w-12 p-2 text-2xl focus:outline-none m-0 text-gray-800" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <Link href="/">
          <a>IFRN GEEKS</a>
        </Link>
        <div className="w-full items-center justify-end hidden md:flex">
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
        </div>
      </div>
    </header>
  )
}
