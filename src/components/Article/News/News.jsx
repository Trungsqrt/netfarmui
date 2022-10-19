import React from 'react'
import "./News.css"
import Menuleft from './Menuleft'
import AllListArticle from './AllListArticle'
import Footer from '../../footer/Footer'
const News = () => {
  return (
    <div>
      <div className='Banner'>
      </div>
      <div className='main' >
        <div className='column-left'>
          <Menuleft></Menuleft>
        </div>
        <div className='column-right'>
        <AllListArticle></AllListArticle>
        </div>
      </div >
      <Footer></Footer>
    </div>
  ) 
}

export default News