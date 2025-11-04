import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch news:', err);
        setError('Failed to load news. Please try again later.');
        setArticles([]);
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {loading && <p style={{ textAlign: 'center' }}>Loading news...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p style={{ textAlign: 'center' }}>No news available for this category.</p>
      )}

      {articles.map((article, index) => (
        <NewsItem
          key={index}
          title={article.title}
          description={article.description}
          urlToImage={article.urlToImage}
          newsUrl={article.url}
        />
      ))}
    </div>
  );
};

export default NewsBoard;
