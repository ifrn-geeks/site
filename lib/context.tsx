import { createContext, useState } from "react"

export const SideBarContext = createContext({
  isOpen: false,
  setIsOpen: (open: boolean) => {}
})

interface Props {
  children: React.ReactNode
}

export const SideBarProvider = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
      {props.children}
    </SideBarContext.Provider>
  )
}
