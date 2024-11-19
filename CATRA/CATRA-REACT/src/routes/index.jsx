import { createFileRoute } from '@tanstack/react-router';
import {Footer, Header,Blog,Features,Posibility,WhatCATRA} from '../containers'
import {Cta, Navbar} from '../components'

import 'src/assets/bootstrap.min.css'
import 'src/styles/App.css'
import 'src/styles/index.css'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
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

export default HomeComponent