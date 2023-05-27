import { ArticleInterface } from "utils/api/articles";
import { formatDatePreview } from "utils/function/format";

export default function ArticlePreview(article: ArticleInterface): JSX.Element {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={`/#/profile/${article.article.author.username}`}>
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </a>
        <div className="info">
          <a href={`/#/profile/${article.article.author.username}`} className="author">
            {article.article.author.username}
          </a>
          <span className="date">{formatDatePreview(article.article.createdAt)}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.article.favoritesCount}
        </button>
      </div>
      <a href={`/#/${article.article.slug}`} className="preview-link">
        <h1>{article.article.title}</h1>
        <p>{article.article.description}</p>
        <span>Read more...</span>
        {article.article.tagList && (
          <ul className="tag-list">
            {article.article.tagList.map(tag => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </a>
    </div>
  );
}
