import React from 'react';
import Article from '../../components/article/Article';
import { blog01, blog02, blog03, blog04, blog05, blog06 } from './imports';
import './blog.css';

const Blog = () => (
  <div className="catra__blog section__padding" id="blog">
    <div className="catra__blog-heading">
      <h1 className="gradient__text">Todo pasa dentro de CATRA  <br /> Conoce nuestras instalaciones</h1>
    </div>
    <div className="catra__blog-container">
      <div className="catra__blog-container_groupA">
        <Article imgUrl={blog01} date="Sep 26, 2021" text="CATRA recepción" />
      </div>
      <div className="catra__blog-container_groupB">
        <Article imgUrl={blog02} date="Sep 26, 2021" text="CATRA Simuladores " />
        <Article imgUrl={blog03} date="Sep 26, 2021" text="CATRA Aulas" />
        
        <Article imgUrl={blog05} date="Sep 26, 2021" text="CATRA Aulas" />
        <Article imgUrl={blog06} date="Sep 26, 2021" text="CATRA Area administrativa" />
      </div>
    </div>
  </div>
); 

export default Blog;