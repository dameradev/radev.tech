"use client"
import '../styles/index.css'
import React from 'react';
import { ThemeContext } from '../lib/themeContext';
import Seo from '../components/Seo';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Layout: React.FC<{ children: any }> = ({ children }) => {
  const { toggle } = React.useContext(ThemeContext)

  return (
    <>
      <body className={`main-wrapper bg-skin-base text-skin-fg min-h-[100vh] dark ${toggle ? "dark" : "light"}`}>
        <Seo />
        <Header />
        {/* <ThemeSwitch /> */}
        <div className='h-24' />

        <main>{children}</main>


        <Footer />
      </body>
    </>
  )
}

export default Layout