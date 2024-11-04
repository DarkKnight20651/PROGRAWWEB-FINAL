import React from 'react'
import './App.css'
import {Footer, Header,Blog,Features,Posibility,WhatCATRA} from './containers'
import {Article, Cta, Navbar,Brand} from './components'
const App = () => {
  return (
    <div className="App gradient__bg">
    <div className="gradient__bg"> 
     <Navbar/>
     <Header/>

    </div>
 
    <WhatCATRA/>
    
    <Features/>
    <Posibility/>
    <Cta/>
    <Blog/>
    <Footer/>
    
   </div>

  )
}

export default App
