import Link from "next/link"

interface Props {
  toc: {
    link: string
    text: string
    level: number
  }[]
  type: "aulas" | "equipe"
}

export const TableOfContents = ({ toc, type }: Props) => {
  return (
    <aside className="hidden sticky right-0 top-0 md:block md:w-1/4 p-5 border-l-2 dark:bg-gray-700 overflow-y-auto">
      {type === "aulas" &&
        <Link href="#Slides-da-aula" key="Slides-da-aula">
          <a className={`block p-3`}>Slides da aula</a>
        </Link>
      }
      {
        toc.map((item) => {
          return (
            <Link href={`#${item.link}`} key={item.link}>
              <a className={`block p-3`}>{item.text}</a>
            </Link>
          )
        })
      }
      {type === "aulas" &&
        <Link href="#Resultado-final" key="Resultado-final">
          <a className={`block p-3`}>Resultado final</a>
        </Link>
      }
    </aside>
  )
}
