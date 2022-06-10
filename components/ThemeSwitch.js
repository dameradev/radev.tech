import React, { useEffect, useState } from "react"
import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

import { getTheme, setDarkMode, setLightMode } from "../lib/fns"
import { ThemeContext } from 'lib/themeContext'
// : React.FC<EmptyProps> 
const ThemeSwitch = () => {
  const [isDark, toggleDark] = useState(true)


  // useEffect(() => {
  //   const theme = getTheme();
  //   const isSetDark = theme === "dark";

  //   console.log("isSetDark", isSetDark)
  //   if (isSetDark) {
  //     setDarkMode()
  //   } else {
  //     setLightMode()
  //   }
  // }, [isDark]);
  // const changeTheme = () => {
  //   toggleDark(!isDark)
  // }


  const { toggle, toggleFunction } = React.useContext(ThemeContext);


  // useEffect(() => {
  //   toggleDark(getTheme() === "dark")
  //   // setDarkMode()
  // },[]);

  // const changeTheme = () => {
  //   toggleDark(!isDark)
  //   if (isDark) {
  //     setDarkMode()
  //   } else {
  //     setLightMode()
  //   }
  // }

  console.log(toggle,'toggle')
  return (
    <Switch
      checked={!toggle}
      onChange={() => {
        console.log('test')
        toggleFunction()
      }}
      className="bg-skin-fg z-10 relative flex justify-between items-center flex-shrink-0 h-8 w-16 px-1 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-skin-focus focus-visible:ring-opacity-75"
    >
      {toggle && <SunIcon className="w-5 h-5 text-skin-base" />}
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className="bg-skin-base
        pointer-events-none inline-block h-5 w-5 rounded-full shadow-lg transform ring-0 transition-colors ease-in-out duration-500"
      />
      {!toggle && <MoonIcon className="w-5 h-5 text-skin-base" />}
    </Switch>
  )
}

export default ThemeSwitch
