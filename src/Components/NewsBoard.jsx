import {useEffect,useState} from 'react';
import NewsItem from './NewsItem';


const NewsBoard = ({category}) => {
    const [articles,setArticles]=useState([]);

    useEffect(()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.articles)) {
                setArticles(data.articles);
                } else {
                setArticles([]); // fallback to empty array
                }
        });  
    },[category])
    return (
    <div>
      <h2 className="text-center">Latest <span className='badge bg-danger'>News</span></h2>
      {articles.map((article,index)=>{
        return(
            <NewsItem key={index} title={article.title} description={article.description} urlToImage={article.urlToImage} newsUrl={article.url}/>
        )
      })}
    </div>
  )
}

export default NewsBoard
