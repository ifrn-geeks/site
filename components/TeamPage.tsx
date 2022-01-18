import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { components } from "./MdxComponents"

interface Props {
  source: MDXRemoteSerializeResult
  frontMatter: {
    nome: string
    links: { ícone: string, url: string }[]
    descrição: string
    foto: string
    cargo: string
  }
}

export const TeamPage = ({ source, frontMatter }: Props) => {
  return (
    <div className="prose mx-auto dark:prose-invert">
      <h1>{frontMatter.nome}</h1>
      <MDXRemote {...source} components={components} />
    </div>
  )
}
