import newsmania from '../assets/newsmania.jpg';

const NewsItem = ({ title, description, urlToImage, newsUrl }) => {
  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
      style={{ maxWidth: '345px' }}
    >
      <img
        src={urlToImage || newsmania}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = newsmania;
        }}
        style={{ height: '200px', width: '325px' }}
        className="card-img-top"
        alt="News"
      />
      <div className="card-body">
        <h5 className="card-title">
          {title ? title.slice(0, 45) : 'Untitled'}
        </h5>
        <p className="card-text">
          {description
            ? description.slice(0, 88)
            : 'News description is not available'}
        </p>
        <a href={newsUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;