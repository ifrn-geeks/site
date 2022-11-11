import type { AppProps } from "next/app"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { SideBarProvider } from "../lib/context"
import { ThemeProvider } from "next-themes"
import "windi.css"

config.autoAddCss = false

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <SideBarProvider>
        <Component {...pageProps} />
      </SideBarProvider>
    </ThemeProvider>
  )
}
