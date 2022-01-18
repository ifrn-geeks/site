import { createElement, FunctionComponent, HTMLAttributes } from "react"
import slugify from "slugify"
import { CodeBlock, dracula } from "react-code-blocks";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading: FunctionComponent<Props> = ({ level, children, ...props }) => {
  const tag = `h${level}`

  return createElement(tag, { ...props, id: slugify(children!.toString()) }, children)
}

export const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading {...{ ...props, level: 2 }} />,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading {...{ ...props, level: 3 }} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading {...{ ...props, level: 4 }} />,
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading {...{ ...props, level: 5 }} />,
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading {...{ ...props, level: 6 }} />,
  code: (props: HTMLAttributes<HTMLSpanElement>) => <CodeBlock text={props.children} language={props.className?.split("-")[1]} theme={dracula} />,
}
