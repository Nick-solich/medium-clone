import { useEffect, useState } from "react";
import { ArticleRequestInterface, ArticleInterface, articleRequest } from "utils/api/articles";
import { DefaultResponseInterface } from "utils/api/default";
import { formatDatePreview } from "utils/function/format";
import { marked } from "marked";

export default function Article(): JSX.Element {
  const [article, setArticle] = useState<ArticleInterface>();

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    //Get the slug from the url
    const locationSlug = window.location.hash.split("/").pop();
    //Check if locationSlug is undefined
    if (!locationSlug) return;
    //Make the request
    const request: ArticleRequestInterface = { slug: locationSlug };
    const response: DefaultResponseInterface = await articleRequest(request);
    if (!response.ok) return;
    setArticle(JSON.parse(response.message));
    console.log(JSON.parse(response.message));
  };

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.article.title}</h1>

            <div className="article-meta">
              <a href={`/#/profile/${article?.article.author.username}`}>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div className="info">
                <a href={`/#/profile/${article?.article.author.username}`} className="author">
                  {article?.article.author.username}
                </a>
                <span className="date">{formatDatePreview(article?.article.createdAt + "")}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {article?.article.author.username} <span className="counter">(0)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">{article?.article.favoritesCount}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article?.article.description}</p>
              <h2 id="introducing-ionic">{article?.article.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: marked.parse(article?.article.body + "") }} />
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="/#/profile/ericsimmons">
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div className="info">
                <a href="/#/profile/ericsimmons" className="author">
                  {article?.article.author.username}
                </a>
                <span className="date">{formatDatePreview(article?.article.createdAt + "")}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {article?.article.author.username}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">{article?.article.favoritesCount}</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit" />
                    <i className="ion-trash-a" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
