import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { components } from "./MdxComponents"

interface Props {
  source: MDXRemoteSerializeResult
  frontMatter: {
    nome: string
    número: number
    conteúdo_propedêutico: string
    descrição: string
    slides: string
    tinkercard: string
  }
}

export const ClassePage = ({ source, frontMatter }: Props) => {
  return (
    <>
      <div className="prose mx-auto dark:prose-invert">
        <h1>Aula {frontMatter.número}: {frontMatter.nome}</h1>
        <h2 id="Slides-da-aula">Slides da aula</h2>
        <a className="md:hidden" href={frontMatter.slides}>Clique aqui para acessar os slides da aula</a>
      </div>
      <iframe className="mx-auto mt-5 mb-10 hidden md:block" src={frontMatter.slides + "/embed"} frameBorder="0" width="725" height="444" allowFullScreen={true}></iframe>
      <div className="prose mx-auto dark:prose-invert">
        <MDXRemote {...source} components={components} />
      </div>
      <div className="prose mx-auto dark:prose-invert mt-5">
        <h2 id="Resultado-final">Resultado final:</h2>
        <a className="md:hidden" href={frontMatter.tinkercard}>Clique aqui para acessar o tinkercad da aula</a>
      </div>
      <iframe className="mx-auto mt-5 hidden md:block" src={frontMatter.tinkercard.replace("things", "embed")} width="725" height="453"></iframe>
    </>
  )
}
