import React from 'react'
import './App.css'
import {Footer, Header,Blog,Features,Posibility,WhatCATRA} from '../containers'
import {Article, Cta, Navbar,Brand} from '../components'
const Infocatra = () => {
  return (
    <div className="App gradient__bg">
    <div className="gradient__bg"> 
     <Navbar/>
    

    </div>
 
    
    <Features/>
    <Posibility/>
    <Cta/>
  
    <Footer/>
    
   </div>
  )
}

export default Infocatra
