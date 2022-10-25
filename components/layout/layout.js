import React from 'react'
import MainHeader from './main-header'

export default function Layout({children}) {
  return (
    <>
    <MainHeader/>
    <main>
        {children}
    </main>
    </>
  )
}
